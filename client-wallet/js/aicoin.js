window.onload = function () {
    configPage.loadNodeUrl();
    console.log("Connecting to Coin interface: " + configPage.nodeUrl);

    // restrict to MAINNET network .
    AICoin.setSingleNetwork("MAINNET");
    AICoin.setNodeUrl($.trim(configPage.nodeUrl));
    try {
        AICoin.connect();
        var info = AICoin.coinInfo();
        if (typeof info === "undefined") {
            configPage.isConnected = false;
            $('.connection-error .node-url-span').text(configPage.nodeUrl);
            $('.connection-error').slideDown();
            configPage.isConnected = true;
        }
        else {
            $('.connection-success .text-message').text(' You are connected to ' + configPage.nodeUrl + ' Geth node.');
            setTimeout(function () {
                $('.connection-success').slideDown();
                setTimeout(function () {
                    $('.connection-success').slideUp();
                }, 5000);
            }, 200);
            console.log("Coin Name: " + info.name);
            console.log("Coin Symbol: " + info.symbol);
            console.log("Coin Issued: " + parseFloat(info.issued).toFixed(8) + " " + info.symbol);
        }

    } catch (ex) {
        configPage.isConnected = false;
        $('.connection-error .node-url-span').text(configPage.nodeUrl);
        $('.connection-error').slideDown();
    }
    setInterval(function () {
        console.log("Periodic checking of Ethereum node connection.");
        try {
            var info = AICoin.coinInfo();
            if (typeof info === "undefined") {
                configPage.isConnected = false;
                $('.connection-error .node-url-span').text(configPage.nodeUrl);
                $('.connection-error').slideDown();
                console.log('Fail to connect AICoin core.');
            }
            else {
                configPage.isConnected = true;
                $('.connection-error').slideUp();
                console.log('AICoin node connection OK.');
            }
        }
        catch (ex) {
            configPage.isConnected = false;
            $('.connection-error .node-url-span').text(configPage.nodeUrl);
            $('.connection-error').slideDown();
            console.log('Fail to connect AICoin core.');
        }
    }, 60000);

    mainPage.reload();

    $(".password_show_button").mouseup(function () {
        $(".password-field").attr("type", "password");
    });
    $(".password_show_button").mousedown(function () {
        $(".password-field").attr("type", "text");
    });
}

var AllAccouts = [];
var GethAccounts = [];
var AdditionalAccounts = [];
var AllBallots = [];

var mainPage = {
    currentPageId: 'coin-page',
    alertModal: null,
    navigate: function (pageId) {
        mainPage.currentPageId = pageId;
        // $('.main.main-raised.active:not(#' + pageId + ')').removeClass('active');
        // $('#' + pageId).addClass('active');

        $('.main.main-raised.active:not(#' + pageId + ')').animate({
            left: '-150%'
        }, 199);
        setTimeout(function () { $('.main.main-raised.active:not(#' + pageId + ')').removeClass('active'); }, 200);


        setTimeout(function () {
            $('#' + pageId).css('left', '150%');
            $('#' + pageId).addClass('active');
            $('#' + pageId).stop(true, true).animate({
                left: '0%'
            }, 200);
        }, 200);

        setTimeout(mainPage.reload, 500);
    },
    reload: function () {
        if (mainPage.currentPageId == 'coin-page') {
            $('#coin-loader').show();
            setTimeout(function () {
                try {
                    coinsPage.showCoins();
                }
                catch (ex) { }
                $('#coin-loader').hide();
            }, 50);
        }
        else if (mainPage.currentPageId == 'ballotinprogress-page') {
            $('#openballots-loader').show();
            setTimeout(function () {
                try {
                    ballotsPages.loadOpenBallots();
                }
                catch (ex) { }
                $('#openballots-loader').hide();
            }, 50);
        }
        else if (mainPage.currentPageId == 'futureballots-page') {
            $('#futureballots-loader').show();
            setTimeout(function () {
                try {
                    ballotsPages.loadFutureBallots();
                }
                catch (ex) { }
                $('#futureballots-loader').hide();
            }, 50);
        }
        else if (mainPage.currentPageId == 'pastballots-page') {
            $('#pastballots-loader').show();
            setTimeout(function () {
                try {
                    ballotsPages.loadPastBallots();
                }
                catch (ex) { }
                $('#pastballots-loader').hide();
            }, 100);
        }
        else if (mainPage.currentPageId == 'config-page') {

        }
    },
    showAlert: function (message) {
        mainPage.alertModal = $('#feedback-modal').modal();
        $('#feedback-modal .modal-message').text(message);
    },
    showLoader: function (message) {
        $('#full-page-loader label').text(message);
        $('#full-page-loader').show();
    },
    hideLoader: function () {
        $('#full-page-loader label').text('');
        $('#full-page-loader').hide();
    }
};

var coinsPage = {
    addAccountModal: null,
    sendCoinsModal: null,
    showCoins: function () {
        coinsPage.loadAllCoins();

        var coinsTableHtml = '';
        $('#coin-accounts-dropdown option').remove().end();
        if (AllAccouts != null && AllAccouts != [] && AllAccouts.length > 0) {
            var uniqueAccounts = [];
            for (var i = 0; i < AllAccouts.length; i++) {
                uniqueAccounts.push(AllAccouts[i]);
            }
            AllAccouts = uniqueAccounts.reverse().filter(function (e, i, arr) {
                return arr.indexOf(e, i + 1) === -1;
            }).reverse();
            for (var i = 0; i < AllAccouts.length; i++) {
                coinsTableHtml += '<tr>';
                coinsTableHtml += '<td class="text-center">' + (i + 1) + '</td>';
                var thisAccount = AllAccouts[i];
                coinsTableHtml += '<td>' + thisAccount + '</td>';
                var balance = 0;
                try {
                    balance = AICoin.balance(thisAccount);
                }
                catch (ex) { }
                coinsTableHtml += '<td class="text-right">' + balance + '</td>';
                coinsTableHtml += '<td class="text-center">XAI</td>';
                coinsTableHtml += '<td class="text-center">';
                coinsTableHtml += '<button class="btn btn-success btn-sm send-coins-btn" onclick="coinsPage.showSendCoinsPanel(\'' + thisAccount.toLowerCase() + '\')">Send<div class="ripple-container"></div></button>';
                if (coinsPage.isLocalAccount(thisAccount)) {
                    coinsTableHtml += '<button class="btn btn-danger btn-sm delete-address-btn" onclick="coinsPage.deleteLocalAccount(\'' + thisAccount.toLowerCase() + '\')">Delete<div class="ripple-container"></div></button>';
                }
                coinsTableHtml += '</td>';
                coinsTableHtml += '</tr>';
                $('#coin-accounts-dropdown').append($("<option />").val(thisAccount.toLowerCase()).text(thisAccount.toLowerCase()));
            }
        }

        if ($('#coins-table tbody tr').html() !== coinsTableHtml) {
            $('#coins-table tbody tr').remove();
            $('#coins-table tbody').html(coinsTableHtml);
        }
    },
    loadAllCoins: function () {
        GethAccounts = AICoin.localAccounts();
        AdditionalAccounts = coinsPage.loadAdditionalAccounts();
        AllAccouts = [];
        if (GethAccounts && GethAccounts != null && GethAccounts.length > 0)
            AllAccouts = AllAccouts.concat(GethAccounts);
        if (AdditionalAccounts && AdditionalAccounts != null && AdditionalAccounts.length > 0)
            AllAccouts = AllAccouts.concat(AdditionalAccounts);

    },
    loadAdditionalAccounts: function () {
        var localAccounts = JSON.parse(GetVariable("BrowserAicoinAccounts"));
        if (localAccounts != null && localAccounts != '') {
            if (Array.isArray(localAccounts))
                return localAccounts;
            else {
                var tempArray = [];
                tempArray.push(localAccounts);
                return tempArray;
            }
        }
        return [];
    },
    isLocalAccount: function (address) {
        if (AdditionalAccounts != null && AdditionalAccounts.length > 0)// && AdditionalAccounts.indexOf(address) > -1)
        {
            for(var i=0; i < AdditionalAccounts.length; i++) {
                if($.trim(AdditionalAccounts[i].toLowerCase()) == $.trim(address))
                    return true;
            }
        }
        return false;
    },
    deleteLocalAccount: function (address) {
        if (coinsPage.isLocalAccount(address)) {
            var index = AdditionalAccounts.indexOf(address);
            AdditionalAccounts.splice(index, 1);
            SaveVariable("BrowserAicoinAccounts", JSON.stringify(AdditionalAccounts));
            coinsPage.showCoins();
            return true;
        }
        return false;
    },
    showAddAccountModal: function () {
        $('#new-address').val('');
        coinsPage.addAccountModal = $('#add-address-modal').modal();
    },
    saveNewAddress: function () {
        coinsPage.addAdditionalAccount($.trim($('#new-address').val()));
        coinsPage.showCoins();
        coinsPage.addAccountModal.modal('hide');
    },
    addAdditionalAccount: function (address) {
        if (address != '') {
            for (var i = 0; i < AllAccouts.length; i++) {
                if ($.trim(AllAccouts[i].toLowerCase()) == $.trim(address.toLowerCase())) {
                    console.log("Wallet address already exists in coins list.");
                    return false;
                }
            }
            AdditionalAccounts = coinsPage.loadAdditionalAccounts();
            AdditionalAccounts.push(address);
            AllAccouts.push(address);
            //localStorage.removeItem("BrowserAicoinAccounts");
            SaveVariable("BrowserAicoinAccounts", JSON.stringify(AdditionalAccounts));
            return true;
        }
        return false;
    },
    showSendCoinsPanel: function (address) {
        coinsPage.sendCoinsModal = $('#send-coins-modal').modal();
        if (address && address !== '') {
            $('#sender').val(address);
            $('#sender').parent('div.form-group').removeClass('is-empty');
            $('#sender').prop('readonly', true);
        }
    },
    sendCoins: function (address, key, toAddress, amount) {
        var recipient = $('#recipient').val();
        if (AICoin.verifyAddressString(recipient) !== true) {
            mainPage.showAlert("The recipient address does not appear to be a valid format.");
            return false;
        }
        var amount = $('#amount').val();
        if (parseFloat(amount) <= 0) {
            mainPage.showAlert("The amount (" + amount + ") appears not to be a valid value");
            return false;
        } else {
            amount = parseFloat(amount);
        }
        var sender = $('#sender').val();
        if (AICoin.verifyAddressString(sender) !== true) {
            mainPage.showAlert("The sender address does not appear to be a valid format.");
            return false;
        }
        var key = $('#sender-key').val();
        AICoin.transfer(recipient, amount, sender, key, coinsPage.sendCoinsCallback);
    },
    sendCoinsCallback: function (err, result) {
        if (err) {
            console.log(err);
            mainPage.showAlert("Failed to send coins!\n" + err);
        } else {
            console.log(result);
            mainPage.showAlert("Coins sent. Transaction id = " + result);
            coinsPage.sendCoinsModal.modal('hide');

            $('#recipient').val('');
            $('#amount').val('');
            $('#sender').val('');
            $('#sender-key').val('');
            console.log('Coins succesfully sent!');
        }
    }
};

var ballotsPages = {
    sendVoteModal: null,
    loadOpenBallots: function () {
        var openBallotsHtml = '';
        AllBallots = AICoin.ballots();
        if (AllBallots && AllBallots != null && AllBallots.length > 0) {
            for (var i = 0; i < AllBallots.length; i++) {
                var ballotInfo = AllBallots[i];
                var ballotHeaderHtml = '';
                ballotHeaderHtml += '<div class="header ballot-header">';
                ballotHeaderHtml += '<div class="nav-tabs-navigation">';
                ballotHeaderHtml += '<div class="nav-tabs-wrapper">';
                ballotHeaderHtml += '<ul class="nav nav-tabs" data-tabs="tabs">';
                ballotHeaderHtml += '<li class="ballot-question">';
                ballotHeaderHtml += '<i class="material-icons">question_answer</i>';
                ballotHeaderHtml += '<h4>';
                ballotHeaderHtml += ballotInfo.name;
                ballotHeaderHtml += '</h4>';
                ballotHeaderHtml += '</li>';
                ballotHeaderHtml += '</ul>';
                ballotHeaderHtml += '</div>';
                ballotHeaderHtml += '</div>';
                ballotHeaderHtml += '</div>';
                // Open ballots
                if (ballotInfo.sealed === true && ballotInfo.open === true) {
                    //const divPanel = buildBallotHeader(ballotInfo);
                    openBallotsHtml += '';
                    openBallotsHtml += '<div class="ballot-box col-sm-12 col-md-12 col-lg-6">';
                    openBallotsHtml += '<div class="card card-nav-tabs">';
                    openBallotsHtml += ballotHeaderHtml;
                    openBallotsHtml += '<div class="content opan-ballot-answers">';
                    openBallotsHtml += '<div class="tab-content text-center">';
                    openBallotsHtml += '<h4 class="start-date-label">Vote end date: ' + formatDate(new Date(ballotInfo.end * 1000), 5) + '</h4>';
                    openBallotsHtml += '<div class="tab-pane active ballot-answers">';
                    if (ballotInfo.options && ballotInfo.options.length > 0) {
                        for (var j = 0; j < ballotInfo.options.length; j++) {
                            var thisOption = ballotInfo.options[j];
                            openBallotsHtml += '<div class="togglebutton">';
                            openBallotsHtml += '<label>';
                            openBallotsHtml += '<input type="checkbox" class="ch-toggle question-toggle-' + ballotInfo.id + ' answer-' + (j + 1) + '" ballotid="' + ballotInfo.id + '" ballotname="' + ballotInfo.name + '" ballotoption="' + (j + 1) + '" ballotoptionname="' + thisOption + '"><span class="toggle"></span>';
                            openBallotsHtml += thisOption;
                            openBallotsHtml += '</label>';
                            openBallotsHtml += '</div>';
                        }
                    }

                    openBallotsHtml += '</div>';
                    openBallotsHtml += '<button  class="btn btn-success pull-right"  ballotid="' + ballotInfo.id + '" ballotname="' + ballotInfo.name + '" onclick="ballotsPages.showSendVoteModal(' + ballotInfo.id + ')">Vote<div class="ripple-container"></div></button>';
                    openBallotsHtml += '</div>';
                    openBallotsHtml += '</div>';
                    openBallotsHtml += '</div>';
                    openBallotsHtml += '<div class="space-20"></div>';
                    openBallotsHtml += '</div>';

                    setTimeout(ballotsPages.setToggleButtonsBehaviour, 500, '.question-toggle-' + ballotInfo.id);

                    // Set Events on checkbox
                }
            }
        }
        $('#ballotinprogress-container').html(openBallotsHtml);
    },
    loadFutureBallots: function () {
        var futureBallotsHtml = '';
        AllBallots = AICoin.ballots();
        if (AllBallots && AllBallots != null && AllBallots.length > 0) {
            for (var i = 0; i < AllBallots.length; i++) {
                var ballotInfo = AllBallots[i];
                var ballotHeaderHtml = '<div class="header ballot-header">';
                ballotHeaderHtml += '<div class="nav-tabs-navigation">';
                ballotHeaderHtml += '<div class="nav-tabs-wrapper">';
                ballotHeaderHtml += '<ul class="nav nav-tabs" data-tabs="tabs">';
                ballotHeaderHtml += '<li class="ballot-question">';
                ballotHeaderHtml += '<i class="material-icons">question_answer</i>';
                ballotHeaderHtml += '<h4>';
                ballotHeaderHtml += ballotInfo.name;
                ballotHeaderHtml += '</h4>';
                ballotHeaderHtml += '</li>';
                ballotHeaderHtml += '</ul>';
                ballotHeaderHtml += '</div>';
                ballotHeaderHtml += '</div>';
                ballotHeaderHtml += '</div>';

                if (ballotInfo.sealed === true && ballotInfo.open === false && ballotInfo.ended === false) {
                    futureBallotsHtml += '<div class="ballot-box col-sm-12 col-md-12 col-lg-6">';
                    futureBallotsHtml += '<div class="card card-nav-tabs">';
                    futureBallotsHtml += ballotHeaderHtml;
                    // Start ballot content
                    futureBallotsHtml += '<div class="content">';
                    futureBallotsHtml += '<div class="tab-content text-center">';
                    futureBallotsHtml += '<h4 class="start-date-label">Vote start date: ' + formatDate(new Date(ballotInfo.start * 1000), 5) + '</h4>';
                    futureBallotsHtml += '<div class="tab-pane active ballot-answers">';
                    // Start ballot options
                    if (ballotInfo.options && ballotInfo.options.length > 0) {
                        for (var j = 0; j < ballotInfo.options.length; j++) {
                            var thisOption = ballotInfo.options[j];
                            futureBallotsHtml += '<div class="togglebutton">';
                            futureBallotsHtml += '<label>';
                            futureBallotsHtml += '<input type="checkbox" class="ch-toggle" disabled="disabled"><span class="toggle"></span>';
                            futureBallotsHtml += thisOption;
                            futureBallotsHtml += '</label>';
                            futureBallotsHtml += '</div>';
                        }
                    }
                    // End ballot options
                    futureBallotsHtml += '</div>';
                    futureBallotsHtml += '</div>';
                    futureBallotsHtml += '</div>';
                    // End of ballot content
                    futureBallotsHtml += '</div>';
                    futureBallotsHtml += '<div class="space-20"></div>';
                    futureBallotsHtml += '</div>';
                }
            }
        }
        $('#futureballots-container').html(futureBallotsHtml);
    },
    loadPastBallots: function () {
        var pastBallotsHtml = '';
        AllBallots = AICoin.ballots();
        if (AllBallots && AllBallots != null && AllBallots.length > 0) {
            for (var i = 0; i < AllBallots.length; i++) {
                var ballotInfo = AllBallots[i];
                var ballotHeaderHtml = '';
                ballotHeaderHtml += '<div class="header ballot-header">';
                ballotHeaderHtml += '<div class="nav-tabs-navigation">';
                ballotHeaderHtml += '<div class="nav-tabs-wrapper">';
                ballotHeaderHtml += '<ul class="nav nav-tabs" data-tabs="tabs">';
                ballotHeaderHtml += '<li class="ballot-question">';
                ballotHeaderHtml += '<i class="material-icons">question_answer</i>';
                ballotHeaderHtml += '<h4>';
                ballotHeaderHtml += ballotInfo.name;
                ballotHeaderHtml += '</h4>';
                ballotHeaderHtml += '</li>';
                ballotHeaderHtml += '</ul>';
                ballotHeaderHtml += '</div>';
                ballotHeaderHtml += '</div>';
                ballotHeaderHtml += '</div>';
                if (ballotInfo.sealed === true && ballotInfo.ended === true) {
                    ballotInfo.votesCast = AICoin.ballotResults(ballotInfo.id);
                    AllBallots[i].votesCast = ballotInfo.votesCast;
                    var winIndex = 0;
                    var winOption = '';
                    var voteSum = 0;
                    var winVote = 0;
                    if (ballotInfo.votesCast && ballotInfo.votesCast.length > 0) {
                        for (var j = 0; j < ballotInfo.votesCast.length; j++) {
                            var thisVoteCount = Number(ballotInfo.votesCast[j].voteCount);
                            ballotInfo.options[j] = { name: ballotInfo.options[j], voteCount: thisVoteCount };
                            voteSum += thisVoteCount;
                            if (thisVoteCount > winVote) {
                                winVote = thisVoteCount;
                                winIndex = j;
                                winOption = ballotInfo.votesCast[j].optionName;
                            }
                        }
                    }
                    pastBallotsHtml += '';
                    pastBallotsHtml += '<div class="ballot-box col-sm-12 col-md-12 col-lg-6">';
                    pastBallotsHtml += '<div class="card card-nav-tabs">';
                    pastBallotsHtml += ballotHeaderHtml;
                    // Start ballot content
                    pastBallotsHtml += '<div class="content">';
                    pastBallotsHtml += '<div class="tab-content text-center">';
                    pastBallotsHtml += '<div class="tab-pane active ballot-answers">';
                    // Start ballot options
                    if (ballotInfo.options && ballotInfo.options.length > 0) {
                        for (var j = 0; j < ballotInfo.options.length; j++) {
                            var thisOption = ballotInfo.options[j];
                            var thisVoteCast = ballotInfo.votesCast[j];
                            pastBallotsHtml += '<div class="ballot-result col-sm-6 col-md-4 col-lg-3' + ((winIndex == j) ? ' win' : '') + '">';
                            pastBallotsHtml += '<div class="card card-nav-tabs">';
                            pastBallotsHtml += '<div class="header ballot-result-header">';
                            pastBallotsHtml += '<img src="img/star.png">';
                            pastBallotsHtml += '</div>';
                            pastBallotsHtml += '<div class="content content-results-answers">';
                            pastBallotsHtml += '<span>' + thisOption.voteCount + '</span>';
                            pastBallotsHtml += '<div class="clear"></div>';
                            pastBallotsHtml += '<span>Votes</span>';
                            pastBallotsHtml += '</div>';
                            pastBallotsHtml += '<div class="content text-result-answer">';
                            pastBallotsHtml += '<div class="number-of-votes text-center">';
                            pastBallotsHtml += '<div class="answer-text text-center">';
                            pastBallotsHtml += '<div class="tab-pane active ballot-answers">';
                            var votePercent = 0;
                            if (voteSum > 0)
                                votePercent = ((thisOption.voteCount / voteSum) * 100).toFixed(1);
                            pastBallotsHtml += '<span>' + thisOption.name + ' ' + votePercent + '%</span>';
                            pastBallotsHtml += '</div>';
                            pastBallotsHtml += '</div>';
                            pastBallotsHtml += '</div>';
                            pastBallotsHtml += '</div>';
                            pastBallotsHtml += '</div>';
                            pastBallotsHtml += '</div>';
                        }
                        // End ballot options
                        pastBallotsHtml += '</div>';
                        pastBallotsHtml += '</div>';
                        pastBallotsHtml += '</div>';
                        // End of ballot content
                        pastBallotsHtml += '</div>';
                        pastBallotsHtml += '<div class="space-20"></div>';
                        pastBallotsHtml += '</div>';
                    }
                }
            }
        }
        $('#pastballots-container').html(pastBallotsHtml);
    },
    showSendVoteModal: function (ballotId) {
        var ballotOptionElement = $(".ch-toggle[ballotid='" + ballotId + "']:checked");
        if (ballotOptionElement.length > 0) {
            var ballotOptionId = ballotOptionElement.attr('ballotoption');
            var ballotOption = ballotOptionElement.attr('ballotoptionname');
            var ballotQuestion = ballotOptionElement.attr('ballotname');
            if (ballotOptionId != '') {
                $('#send-vote-questiontext').text(ballotQuestion);
                $('#send-vote-answertext').text(ballotOption);
                $('#send-vote-btn').attr('onclick', 'ballotsPages.sendVote(' + ballotId + ', ' + ballotOptionId + ')');
                ballotsPages.sendVoteModal = $('#send-vote-modal').modal();
            }
        }
    },
    sendVote: function (ballotId, optionId) {
        var voteAddress = $('#coin-accounts-dropdown option').val();
        var balance = AICoin.balance(voteAddress);
        var voted = AICoin.balanceVoted(voteAddress, ballotId);
        var key = $('#send-vote-key').val();
        if (key == '') {
            mainPage.showAlert("Please enter private key for selected address.")
            return false;
        }
        if (balance - voted <= 0.0) {
            mainPage.showAlert("This address either holds no coins, or has already voted its full balance in this ballot.")
            return false;
        }
        AICoin.vote(ballotId, optionId, voteAddress, key, ballotsPages.sendVoteCallback);
    },
    sendVoteCallback: function (err, result) {
        if (err) {
            console.log(err);
            mainPage.showAlert("Failed to send vote transaction!\n" + err);
        }
        else {
            console.log(result);
            $('#send-vote-key').val('');
            mainPage.showAlert("Vote cast. Transaction ID : " + result);
            ballotsPages.sendVoteModal.modal('hide');
        }
    },
    setToggleButtonsBehaviour: function (toggleSelector) {
        $(toggleSelector).change(function () {
            if (this.checked) {
                $(this).parent().parent().parent().find('.ch-toggle').prop('checked', false);
                $(this).prop('checked', true);
            }
        });
    }
};

var configPage = {
    nodeUrlDefault: 'http://localhost:8545',
    nodeUrl: '',
    isConnected: false,
    saveConfig: function () {
        $('.connection-success').hide();
        $('.connection-error').hide();

        var newNodeUrl = $.trim($('#geth-node-url').val());
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        if (!pattern.test(newNodeUrl)) {
            mainPage.showAlert("Please enter a valid URL.");
            return false;
        }

        // Save Url
        configPage.nodeUrl = newNodeUrl;
        SaveVariable("EthereumNodeUrl", newNodeUrl);

        try {
            console.log("Change connection node URL: " + configPage.nodeUrl);
            AICoin.setNodeUrl(configPage.nodeUrl);
            AICoin.reconnect();
            var info = AICoin.coinInfo();
            if (typeof info === "undefined") {
                $('.connection-success').slideUp();
                $('.connection-error .node-url-span').text(configPage.nodeUrl);
                $('.connection-error').slideDown();
                console.log("AICoin.coinInfo() result undefined, connecting to node: " + configPage.nodeUrl);
            }
            else {
                configPage.isConnected = true;
                $('.connection-success .text-message').text(' You are connected to ' + configPage.nodeUrl + ' Geth node.');
                setTimeout(function () {
                    $('.connection-error').slideUp();
                    $('.connection-success').slideDown();
                    setTimeout(function () {
                        $('.connection-success').slideUp();
                    }, 5000);
                }, 200);
                console.log("Coin Name: " + info.name);
                console.log("Coin Symbol: " + info.symbol);
                console.log("Coin Issued: " + parseFloat(info.issued).toFixed(8) + " " + info.symbol);
            }
        }
        catch (ex) {
            configPage.isConnected = false;
            $('.connection-success').slideUp();
            $('.connection-error .node-url-span').text(configPage.nodeUrl);
            $('.connection-error').slideDown();
            console.log("Error connectiong to node: " + configPage.nodeUrl);
        }
    },
    loadNodeUrl: function () {
        configPage.nodeUrl = $.trim(configPage.nodeUrlDefault);
        if (GetVariable("EthereumNodeUrl") !== null && GetVariable("EthereumNodeUrl") != '') {
            configPage.nodeUrl = $.trim(GetVariable("EthereumNodeUrl"));
        }
        $('#geth-node-url').val($.trim(configPage.nodeUrl));
    }
};

(function ($) {
    $.fn.goTo = function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
        return this; // for chaining...
    }
})(jQuery);

function formatDate(dateObj, format) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var curr_date = dateObj.getDate();
    var curr_month = dateObj.getMonth();
    curr_month = curr_month + 1;
    var curr_year = dateObj.getFullYear();
    var curr_min = dateObj.getMinutes();
    var curr_hr = dateObj.getHours();
    var curr_sc = dateObj.getSeconds();
    if (curr_month.toString().length == 1)
        curr_month = '0' + curr_month;
    if (curr_date.toString().length == 1)
        curr_date = '0' + curr_date;
    if (curr_hr.toString().length == 1)
        curr_hr = '0' + curr_hr;
    if (curr_min.toString().length == 1)
        curr_min = '0' + curr_min;

    if (format == 1)//dd-mm-yyyy
    {
        return curr_date + "-" + curr_month + "-" + curr_year;
    }
    else if (format == 2)//yyyy-mm-dd
    {
        return curr_year + "-" + curr_month + "-" + curr_date;
    }
    else if (format == 3)//dd/mm/yyyy
    {
        return curr_date + "/" + curr_month + "/" + curr_year;
    }
    else if (format == 4)// MM/dd/yyyy HH:mm:ss
    {
        return curr_month + "/" + curr_date + "/" + curr_year + " " + curr_hr + ":" + curr_min + ":" + curr_sc;
    }
    else if (format == 5)// dd/mm/yyyy HH:mm
    {
        return curr_date + "/" + curr_month + "/" + curr_year + " " + curr_hr + ":" + curr_min;
    }
}

function SaveVariable(key, value) {
    if(doesSuppportLocalStorage()) {
        localStorage.setItem(key, value);
    }
    else {
        setCookie(key, value, 365);
    }
}

function GetVariable(key, value) {
    var savedItem = null;
    if(doesSuppportLocalStorage()) {
        savedItem = localStorage.getItem(key);
    }
    else {
        savedItem = getCookie(key);
        if(typeof (savedItem) == 'undefined') {
            savedItem = null;
        }
    }
    return savedItem;
}

function doesSuppportLocalStorage() {
    try {
        if (typeof (localStorage) == 'undefined') {
            return false;
        } else {
            try {
                localStorage.setItem("value", "This is Abhisheks new HTML document");
                return true;
            } catch (e) {
                return false;
            }
        }
    } catch(ex) { return false; }
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString() + "; path=/");
    document.cookie.json = true;
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // IE 12 => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());