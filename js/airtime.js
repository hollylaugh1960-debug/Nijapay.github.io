/* =========================
   SUPABASE CONNECTION
========================= */

const SUPABASE_URL =
    "https://hojvlkiqdtiribxnhzlh.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_rTw950d9-u9DxmsQJFh8Yw__3W7CKN8";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


console.log(
    "Supabase loaded:",
    !!window.supabase
);

console.log(
    "Airtime Supabase loaded:",
    !!supabaseClient
);


/* =========================
   ELEMENTS
========================= */

const phoneNumber =
    document.getElementById(
        "phoneNumber"
    );

const airtimeAmount =
    document.getElementById(
        "airtimeAmount"
    );

const purchaseButton =
    document.getElementById(
        "purchaseAirtime"
    );

const summaryNetwork =
    document.getElementById(
        "summaryNetwork"
    );

const summaryPhone =
    document.getElementById(
        "summaryPhone"
    );

const summaryAmount =
    document.getElementById(
        "summaryAmount"
    );

const summaryTotal =
    document.getElementById(
        "summaryTotal"
    );

const walletBalance =
    document.getElementById(
        "walletBalance"
    );


/* =========================
   LOAD WALLET
========================= */

async function loadWalletBalance() {

    try {

        const {
            data: {
                user
            },
            error: userError
        } =
            await supabaseClient
                .auth
                .getUser();


        if (
            userError ||
            !user
        ) {

            window.location.href =
                "login.html";

            return;

        }


        const {
            data: wallet,
            error
        } =
            await supabaseClient
                .from("wallets")
                .select("balance")
                .eq(
                    "user_id",
                    user.id
                )
                .single();


        if (error) {

            console.error(
                "Wallet error:",
                error
            );

            return;

        }


        const balance =
            Number(
                wallet?.balance || 0
            );


        walletBalance.textContent =
            "₦" +
            balance.toLocaleString(
                "en-NG",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

    }

    catch (error) {

        console.error(
            "Wallet loading error:",
            error
        );

    }

}


/* =========================
   NETWORK
========================= */

function getSelectedNetwork() {

    const selected =
        document.querySelector(
            'input[name="network"]:checked'
        );


    if (!selected) {

        return null;

    }


    return selected.value;

}


function getNetworkName(
    network
) {

    const names = {

        mtn: "MTN",

        airtel: "Airtel",

        glo: "Glo",

        "9mobile": "9mobile"

    };


    return (
        names[network] ||
        network
    );

}


/* =========================
   UPDATE SUMMARY
========================= */

function updateSummary() {

    const network =
        getSelectedNetwork();


    const phone =
        phoneNumber.value.trim();


    const amount =
        Number(
            airtimeAmount.value
        );


    summaryNetwork.textContent =
        getNetworkName(
            network
        );


    summaryPhone.textContent =
        phone ||
        "—";


    summaryAmount.textContent =
        "₦" +
        (
            amount || 0
        ).toLocaleString(
            "en-NG",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );


    summaryTotal.textContent =
        "₦" +
        (
            amount || 0
        ).toLocaleString(
            "en-NG",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}


/* =========================
   NETWORK EVENTS
========================= */

document
    .querySelectorAll(
        'input[name="network"]'
    )
    .forEach(
        function (input) {

            input.addEventListener(
                "change",
                updateSummary
            );

        }
    );


/* =========================
   PHONE EVENT
========================= */

phoneNumber.addEventListener(
    "input",
    function () {

        this.value =
            this.value.replace(
                /\D/g,
                ""
            ).slice(0, 11);


        updateSummary();

    }
);


/* =========================
   AMOUNT EVENT
========================= */

airtimeAmount.addEventListener(
    "input",
    updateSummary
);


/* =========================
   QUICK AMOUNTS
========================= */

document
    .querySelectorAll(
        ".quick-amount"
    )
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    airtimeAmount.value =
                        this.dataset.amount;

                    updateSummary();

                }
            );

        }
    );


/* =========================
   PURCHASE
========================= */

purchaseButton.addEventListener(
    "click",
    async function () {

        const network =
            getSelectedNetwork();


        const phone =
            phoneNumber.value.trim();


        const amount =
            Number(
                airtimeAmount.value
            );


        /* Validate network */

        if (!network) {

            alert(
                "Please select a network."
            );

            return;

        }


        /* Validate phone */

        if (
            !/^0\d{10}$/.test(
                phone
            )
        ) {

            alert(
                "Please enter a valid Nigerian phone number."
            );

            phoneNumber.focus();

            return;

        }


        /* Validate amount */

        if (
            !Number.isFinite(amount) ||
            amount < 50
        ) {

            alert(
                "Please enter an airtime amount of at least ₦50."
            );

            airtimeAmount.focus();

            return;

        }


        purchaseButton.disabled =
            true;


        purchaseButton.textContent =
            "Processing...";


        try {

            /*
             * AIRTIME API WILL BE
             * CONNECTED HERE.
             *
             * DO NOT DEDUCT WALLET
             * YET.
             */


            alert(
                "Airtime purchase is ready.\n\n" +
                "Network: " +
                getNetworkName(network) +
                "\nPhone: " +
                phone +
                "\nAmount: ₦" +
                amount.toLocaleString(
                    "en-NG"
                ) +
                "\n\nAirtime API will be connected next."
            );

        }

        catch (error) {

            console.error(
                "Airtime error:",
                error
            );

            alert(
                "Unable to process airtime purchase."
            );

        }

        finally {

            purchaseButton.disabled =
                false;

            purchaseButton.textContent =
                "Buy Airtime";

        }

    }
);


/* =========================
   START
========================= */

loadWalletBalance();

updateSummary();








/* =========================
   CHECK USER
========================= */

async function checkUser() {

    const {
        data: {
            user
        },
        error
    } =
        await supabaseClient.auth.getUser();


    console.log(
        "Service page user:",
        user
    );

    console.log(
        "Service page auth error:",
        error
    );


    if (error || !user) {

        window.location.replace(
            "login.html"
        );

        return null;

    }

    return user;

}


/* =========================
   DATA FORM
========================= */

const dataForm =
    document.getElementById("dataForm");


console.log(
    "Data form found:",
    !!dataForm
);


if (dataForm) {

    dataForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const user =
                await checkUser();


            if (!user) {
                return;
            }


            const network =
                document.getElementById(
                    "network"
                )?.value;


            const phone =
                document.getElementById(
                    "phone"
                )?.value.trim();


            const dataPlan =
                document.getElementById(
                    "dataPlan"
                )?.value;


            const planType =
                document.getElementById(
                    "planType"
                )?.value;


            const amount =
                Number(
                    document.getElementById(
                        "amount"
                    )?.value
                );


            console.log(
                "Form values:",
                {
                    network,
                    phone,
                    dataPlan,
                    planType,
                    amount
                }
            );


            if (
                !network ||
                !phone ||
                !dataPlan ||
                !planType ||
                !amount
            ) {

                alert(
                    "Please complete all fields."
                );

                return;

            }


            if (
                !/^0\d{10}$/.test(phone)
            ) {

                alert(
                    "Please enter a valid Nigerian phone number."
                );

                return;

            }


            if (amount < 50) {

                alert(
                    "Minimum data purchase is ₦50."
                );

                return;

            }


            console.log(
                "Data purchase:",
                {
                    user_id: user.id,
                    network,
                    phone,
                    data_plan: dataPlan,
                    plan_type: planType,
                    amount
                }
            );


            alert(
                "Data purchase system is ready.\n\n" +
                "Payment integration will be connected next."
            );

        }
    );

}


/* =========================
   CHECK LOGIN
========================= */

checkUser();