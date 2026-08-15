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


/* =========================
   ELEMENTS
========================= */

const cableForm =
    document.getElementById("cableForm");

const provider =
    document.getElementById("cableProvider");

const smartcard =
    document.getElementById("smartcardNumber");

const packageSelect =
    document.getElementById("cablePackage");

const amount =
    document.getElementById("cableAmount");

const verifyBtn =
    document.getElementById("verifyCustomerBtn");

const customerResult =
    document.getElementById("customerResult");

const customerName =
    document.getElementById("customerName");

const customerNumber =
    document.getElementById("customerNumber");

const walletBalance =
    document.getElementById("walletBalance");

const summaryProvider =
    document.getElementById("summaryProvider");

const summaryPackage =
    document.getElementById("summaryPackage");

const summaryAmount =
    document.getElementById("summaryAmount");


/* =========================
   CABLE PACKAGES
========================= */

const packages = {

    dstv: [

        {
            name: "DStv Padi",
            amount: 4400
        },

        {
            name: "DStv Yanga",
            amount: 6000
        },

        {
            name: "DStv Confam",
            amount: 11000
        },

        {
            name: "DStv Compact",
            amount: 19000
        },

        {
            name: "DStv Compact Plus",
            amount: 30000
        }

    ],

    gotv: [

        {
            name: "GOtv Smallie",
            amount: 1900
        },

        {
            name: "GOtv Jinja",
            amount: 3900
        },

        {
            name: "GOtv Max",
            amount: 5700
        },

        {
            name: "GOtv Supa",
            amount: 7600
        }

    ]

};


/* =========================
   LOAD PACKAGES
========================= */

provider.addEventListener(
    "change",
    function () {

        packageSelect.innerHTML =
            '<option value="">Select package</option>';

        amount.value = "";

        summaryProvider.textContent =
            this.options[this.selectedIndex].text;

        summaryPackage.textContent =
            "—";

        summaryAmount.textContent =
            "₦0.00";


        const selected =
            packages[this.value];

        if (!selected) {
            return;
        }


        selected.forEach(
            function (item) {

                const option =
                    document.createElement("option");

                option.value =
                    item.amount;

                option.textContent =
                    item.name +
                    " — ₦" +
                    item.amount.toLocaleString(
                        "en-NG"
                    );

                option.dataset.name =
                    item.name;

                packageSelect.appendChild(
                    option
                );

            }
        );

    }
);


/* =========================
   PACKAGE CHANGE
========================= */

packageSelect.addEventListener(
    "change",
    function () {

        const selected =
            this.options[this.selectedIndex];


        if (!selected.value) {

            amount.value = "";

            summaryPackage.textContent =
                "—";

            summaryAmount.textContent =
                "₦0.00";

            return;

        }


        const packageAmount =
            Number(selected.value);


        amount.value =
            packageAmount;


        summaryPackage.textContent =
            selected.dataset.name;


        summaryAmount.textContent =
            "₦" +
            packageAmount.toLocaleString(
                "en-NG",
                {
                    minimumFractionDigits: 2
                }
            );

    }
);


/* =========================
   CUSTOMER VERIFICATION
========================= */

verifyBtn.addEventListener(
    "click",
    async function () {

        const providerValue =
            provider.value;

        const smartcardValue =
            smartcard.value.trim();


        if (!providerValue) {

            alert(
                "Please select your cable provider."
            );

            return;

        }


        if (!smartcardValue) {

            alert(
                "Please enter your Smartcard/IUC number."
            );

            return;

        }


        verifyBtn.disabled = true;

        verifyBtn.textContent =
            "Verifying...";


        /*
         * TEMPORARY DEMO
         *
         * Real customer verification
         * will be connected to the cable
         * provider API later.
         */

        setTimeout(
            function () {

                customerName.textContent =
                    "Customer verification ready";

                customerNumber.textContent =
                    smartcardValue;


                customerResult.hidden =
                    false;


                verifyBtn.disabled =
                    false;

                verifyBtn.textContent =
                    "Verify Customer";

            },
            800
        );

    }
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
            await supabaseClient.auth.getUser();


        if (userError || !user) {

            console.error(
                "User not found:",
                userError
            );

            return;

        }


        const {
            data: wallet,
            error: walletError
        } =
            await supabaseClient
                .from("wallets")
                .select("balance")
                .eq(
                    "user_id",
                    user.id
                )
                .single();


        if (walletError) {

            console.error(
                "Wallet error:",
                walletError
            );

            return;

        }


        walletBalance.textContent =
            "₦" +
            Number(
                wallet.balance || 0
            ).toLocaleString(
                "en-NG",
                {
                    minimumFractionDigits: 2
                }
            );

    }

    catch (error) {

        console.error(
            "Could not load wallet:",
            error
        );

    }

}


loadWalletBalance();


/* =========================
   SUBMIT CABLE PAYMENT
========================= */

cableForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const providerValue =
            provider.value;

        const smartcardValue =
            smartcard.value.trim();

        const selectedPackage =
            packageSelect.options[
                packageSelect.selectedIndex
            ];


        if (
            !providerValue ||
            !smartcardValue ||
            !selectedPackage.value
        ) {

            alert(
                "Please complete all the required fields."
            );

            return;

        }


        /*
         * IMPORTANT:
         *
         * We are NOT deducting wallet
         * balance yet.
         *
         * The actual cable API will be
         * connected after we choose
         * our utility provider.
         */

        alert(
            "Cable subscription is ready for API integration.\n\n" +
            "Provider: " +
            provider.options[
                provider.selectedIndex
            ].text +
            "\n" +
            "Package: " +
            selectedPackage.dataset.name +
            "\n" +
            "Amount: ₦" +
            Number(
                selectedPackage.value
            ).toLocaleString("en-NG")
        );

    }
);