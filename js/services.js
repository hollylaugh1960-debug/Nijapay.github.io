/* =========================================================
   JODEK PAY — ALL SERVICES JAVASCRIPT
   Services:
   1. Airtime
   2. Data
   3. Cable TV
   4. Electricity
   5. Exam PIN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       HELPER — FORMAT NAIRA
    ===================================================== */

    function formatNaira(amount) {

        return "₦" + Number(amount || 0).toLocaleString(
            "en-NG",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    }



    /* =====================================================
       1. AIRTIME SERVICE
    ===================================================== */

    const purchaseAirtime =
        document.getElementById("purchaseAirtime");


    if (purchaseAirtime) {

        const phoneInput =
            document.getElementById("phoneNumber");

        const amountInput =
            document.getElementById("airtimeAmount");

        const networkInputs =
            document.querySelectorAll(
                'input[name="network"]'
            );

        const quickAmounts =
            document.querySelectorAll(
                ".quick-amount"
            );

        const summaryNetwork =
            document.getElementById("summaryNetwork");

        const summaryPhone =
            document.getElementById("summaryPhone");

        const summaryAmount =
            document.getElementById("summaryAmount");

        const summaryTotal =
            document.getElementById("summaryTotal");


        /* ================= AIRTIME SUMMARY ================= */

        function updateAirtimeSummary() {

            const selectedNetwork =
                document.querySelector(
                    'input[name="network"]:checked'
                );


            const network =
                selectedNetwork
                    ? selectedNetwork.value
                    : "";


            const phone =
                phoneInput
                    ? phoneInput.value.trim()
                    : "";


            const amount =
                amountInput
                    ? Number(amountInput.value) || 0
                    : 0;


            if (summaryNetwork) {

                if (network === "9mobile") {

                    summaryNetwork.textContent =
                        "9mobile";

                } else if (network) {

                    summaryNetwork.textContent =
                        network.toUpperCase();

                } else {

                    summaryNetwork.textContent =
                        "—";

                }

            }


            if (summaryPhone) {

                summaryPhone.textContent =
                    phone || "—";

            }


            if (summaryAmount) {

                summaryAmount.textContent =
                    formatNaira(amount);

            }


            if (summaryTotal) {

                summaryTotal.textContent =
                    formatNaira(amount);

            }

        }


        /* ================= QUICK AMOUNTS ================= */

        quickAmounts.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    if (!amountInput) {
                        return;
                    }


                    amountInput.value =
                        button.dataset.amount;


                    updateAirtimeSummary();

                }
            );

        });


        /* ================= NETWORK ================= */

        networkInputs.forEach(input => {

            input.addEventListener(
                "change",
                updateAirtimeSummary
            );

        });


        /* ================= PHONE ================= */

        if (phoneInput) {

            phoneInput.addEventListener(
                "input",
                updateAirtimeSummary
            );

        }


        /* ================= AMOUNT ================= */

        if (amountInput) {

            amountInput.addEventListener(
                "input",
                updateAirtimeSummary
            );

        }


        /* ================= PURCHASE ================= */

        purchaseAirtime.addEventListener(
            "click",
            () => {

                const selectedNetwork =
                    document.querySelector(
                        'input[name="network"]:checked'
                    );


                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";


                const amount =
                    amountInput
                        ? Number(amountInput.value)
                        : 0;


                if (!selectedNetwork) {

                    alert(
                        "Please select a network."
                    );

                    return;

                }


                if (!/^[0-9]{11}$/.test(phone)) {

                    alert(
                        "Please enter a valid 11-digit Nigerian phone number."
                    );

                    if (phoneInput) {
                        phoneInput.focus();
                    }

                    return;

                }


                if (!amount || amount < 50) {

                    alert(
                        "Minimum airtime purchase is ₦50."
                    );

                    if (amountInput) {
                        amountInput.focus();
                    }

                    return;

                }


                const network =
                    selectedNetwork.value;


                alert(
                    "Airtime Order\n\n" +

                    "Network: " +
                    (
                        network === "9mobile"
                            ? "9mobile"
                            : network.toUpperCase()
                    ) +

                    "\nPhone: " +
                    phone +

                    "\nAmount: " +
                    formatNaira(amount) +

                    "\n\n" +

                    "Payment processing will be connected soon."
                );

            }
        );


        updateAirtimeSummary();

    }



    /* =====================================================
       2. DATA SERVICE
    ===================================================== */

    const dataForm =
        document.getElementById("dataForm");


    if (dataForm) {

        const network =
            document.getElementById("network");

        const phone =
            document.getElementById("phone");

        const dataPlan =
            document.getElementById("dataPlan");

        const planType =
            document.getElementById("planType");

        const amount =
            document.getElementById("amount");


        /* ================= DATA PLAN PRICES ================= */

        /*
           TEMPORARY DEMO PRICES.
           Replace with API prices later.
        */

        const dataPrices = {

            "500mb": 500,

            "1gb": 1000,

            "2gb": 1800,

            "3gb": 2500,

            "5gb": 4000,

            "10gb": 7500

        };


        /* ================= UPDATE DATA AMOUNT ================= */

        function updateDataAmount() {

            if (!dataPlan || !amount) {
                return;
            }


            const selectedPlan =
                dataPlan.value;


            if (
                selectedPlan &&
                dataPrices[selectedPlan]
            ) {

                amount.value =
                    dataPrices[selectedPlan];

            } else {

                amount.value =
                    "";

            }

        }


        /* ================= DATA PLAN CHANGE ================= */

        if (dataPlan) {

            dataPlan.addEventListener(
                "change",
                updateDataAmount
            );

        }


        /* ================= DATA SUBMIT ================= */

        dataForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const networkValue =
                    network
                        ? network.value
                        : "";


                const phoneValue =
                    phone
                        ? phone.value.trim()
                        : "";


                const planValue =
                    dataPlan
                        ? dataPlan.value
                        : "";


                const typeValue =
                    planType
                        ? planType.value
                        : "";


                const amountValue =
                    amount
                        ? Number(amount.value)
                        : 0;


                if (!networkValue) {

                    alert(
                        "Please select a network."
                    );

                    return;

                }


                if (!/^[0-9]{11}$/.test(phoneValue)) {

                    alert(
                        "Please enter a valid 11-digit Nigerian phone number."
                    );

                    if (phone) {
                        phone.focus();
                    }

                    return;

                }


                if (!planValue) {

                    alert(
                        "Please select a data plan."
                    );

                    return;

                }


                if (!typeValue) {

                    alert(
                        "Please select a plan type."
                    );

                    return;

                }


                if (!amountValue) {

                    alert(
                        "Please select a valid data plan."
                    );

                    return;

                }


                alert(
                    "Data Order\n\n" +

                    "Network: " +
                    networkValue.toUpperCase() +

                    "\nPhone: " +
                    phoneValue +

                    "\nPlan: " +
                    planValue.toUpperCase() +

                    "\nType: " +
                    typeValue.toUpperCase() +

                    "\nAmount: " +
                    formatNaira(amountValue) +

                    "\n\n" +

                    "Payment processing will be connected soon."
                );

            }
        );

    }



    /* =====================================================
       3. CABLE TV SERVICE
    ===================================================== */

    const cableForm =
        document.getElementById("cableForm");


    if (cableForm) {

        const provider =
            document.getElementById(
                "cableProvider"
            );

        const smartcard =
            document.getElementById(
                "smartcardNumber"
            );

        const verifyButton =
            document.getElementById(
                "verifyCustomerBtn"
            );

        const customerResult =
            document.getElementById(
                "customerResult"
            );

        const customerName =
            document.getElementById(
                "customerName"
            );

        const customerNumber =
            document.getElementById(
                "customerNumber"
            );

        const packageSelect =
            document.getElementById(
                "cablePackage"
            );

        const cableAmount =
            document.getElementById(
                "cableAmount"
            );

        const summaryProvider =
            document.getElementById(
                "summaryProvider"
            );

        const summaryPackage =
            document.getElementById(
                "summaryPackage"
            );

        const summaryAmount =
            document.getElementById(
                "summaryAmount"
            );


        /* ================= CABLE PACKAGES ================= */

        /*
           TEMPORARY DEMO PRICES.
           Replace with API prices later.
        */

        const cablePackages = {

            dstv: {

                "DStv Compact":
                    15700,

                "DStv Compact Plus":
                    25500,

                "DStv Premium":
                    37000

            },


            gotv: {

                "GOtv Jolli":
                    5800,

                "GOtv Max":
                    8500,

                "GOtv Supa":
                    12500

            }

        };


        /* ================= LOAD PACKAGES ================= */

        function loadCablePackages() {

            if (!packageSelect) {
                return;
            }


            packageSelect.innerHTML =
                '<option value="">Select package</option>';


            const selectedProvider =
                provider
                    ? provider.value
                    : "";


            if (
                !selectedProvider ||
                !cablePackages[selectedProvider]
            ) {

                return;

            }


            Object.entries(
                cablePackages[selectedProvider]
            ).forEach(
                ([packageName, price]) => {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        price;


                    option.textContent =
                        packageName +
                        " — " +
                        formatNaira(price);


                    option.dataset.name =
                        packageName;


                    packageSelect.appendChild(
                        option
                    );

                }
            );

        }


        /* ================= VERIFY CUSTOMER ================= */

        if (verifyButton) {

            verifyButton.addEventListener(
                "click",
                () => {

                    const number =
                        smartcard
                            ? smartcard.value.trim()
                            : "";


                    if (
                        !provider ||
                        !provider.value
                    ) {

                        alert(
                            "Please select a cable provider."
                        );

                        return;

                    }


                    if (!number) {

                        alert(
                            "Please enter your Smartcard/IUC number."
                        );

                        if (smartcard) {
                            smartcard.focus();
                        }

                        return;

                    }


                    /*
                       TEMPORARY VERIFICATION.

                       Real customer verification
                       will later be connected to
                       a cable TV API.
                    */


                    if (customerName) {

                        customerName.textContent =
                            "Verified Customer";

                    }


                    if (customerNumber) {

                        customerNumber.textContent =
                            number;

                    }


                    if (customerResult) {

                        customerResult.hidden =
                            false;

                    }


                    loadCablePackages();

                }
            );

        }


        /* ================= PROVIDER CHANGE ================= */

        if (provider) {

            provider.addEventListener(
                "change",
                () => {

                    if (customerResult) {

                        customerResult.hidden =
                            true;

                    }


                    if (cableAmount) {

                        cableAmount.value =
                            "";

                    }


                    if (summaryProvider) {

                        summaryProvider.textContent =
                            "—";

                    }


                    if (summaryPackage) {

                        summaryPackage.textContent =
                            "—";

                    }


                    if (summaryAmount) {

                        summaryAmount.textContent =
                            "₦0.00";

                    }


                    loadCablePackages();

                }
            );

        }


        /* ================= PACKAGE CHANGE ================= */

        if (packageSelect) {

            packageSelect.addEventListener(
                "change",
                () => {

                    const selected =
                        packageSelect.options[
                            packageSelect.selectedIndex
                        ];


                    if (
                        selected &&
                        selected.value
                    ) {

                        const price =
                            Number(
                                selected.value
                            );


                        if (cableAmount) {

                            cableAmount.value =
                                price;

                        }


                        if (summaryProvider) {

                            summaryProvider.textContent =
                                provider.options[
                                    provider.selectedIndex
                                ].text;

                        }


                        if (summaryPackage) {

                            summaryPackage.textContent =
                                selected.dataset.name ||
                                selected.textContent;

                        }


                        if (summaryAmount) {

                            summaryAmount.textContent =
                                formatNaira(price);

                        }

                    } else {

                        if (cableAmount) {

                            cableAmount.value =
                                "";

                        }


                        if (summaryPackage) {

                            summaryPackage.textContent =
                                "—";

                        }


                        if (summaryAmount) {

                            summaryAmount.textContent =
                                "₦0.00";

                        }

                    }

                }
            );

        }


        /* ================= CABLE SUBMIT ================= */

        cableForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (
                    !provider ||
                    !provider.value
                ) {

                    alert(
                        "Please select a cable provider."
                    );

                    return;

                }


                if (
                    !smartcard ||
                    !smartcard.value.trim()
                ) {

                    alert(
                        "Please enter your Smartcard/IUC number."
                    );

                    return;

                }


                if (
                    customerResult &&
                    customerResult.hidden
                ) {

                    alert(
                        "Please verify the customer first."
                    );

                    return;

                }


                if (
                    !packageSelect ||
                    !packageSelect.value
                ) {

                    alert(
                        "Please select a package."
                    );

                    return;

                }


                const selectedPackage =
                    packageSelect.options[
                        packageSelect.selectedIndex
                    ];


                const amount =
                    Number(
                        packageSelect.value
                    );


                alert(
                    "Cable Subscription\n\n" +

                    "Provider: " +
                    provider.options[
                        provider.selectedIndex
                    ].text +

                    "\nCustomer: " +
                    smartcard.value.trim() +

                    "\nPackage: " +
                    (
                        selectedPackage.dataset.name ||
                        selectedPackage.textContent
                    ) +

                    "\nAmount: " +
                    formatNaira(amount) +

                    "\n\n" +

                    "Payment processing will be connected soon."
                );

            }
        );

    }



    /* =====================================================
       4. ELECTRICITY SERVICE
    ===================================================== */

    const electricityForm =
        document.getElementById(
            "electricityForm"
        );


    if (electricityForm) {

        const disco =
            document.getElementById(
                "disco"
            );

        const meterType =
            document.getElementById(
                "meterType"
            );

        const meterNumber =
            document.getElementById(
                "meterNumber"
            );

        const electricityAmount =
            document.getElementById(
                "electricityAmount"
            );


        const summaryDisco =
            document.getElementById(
                "summaryDisco"
            );

        const summaryMeterType =
            document.getElementById(
                "summaryMeterType"
            );

        const summaryMeterNumber =
            document.getElementById(
                "summaryMeterNumber"
            );

        const summaryElectricityAmount =
            document.getElementById(
                "summaryElectricityAmount"
            );


        /* ================= ELECTRICITY SUMMARY ================= */

        function updateElectricitySummary() {

            if (summaryDisco) {

                if (
                    disco &&
                    disco.value
                ) {

                    summaryDisco.textContent =
                        disco.options[
                            disco.selectedIndex
                        ].text;

                } else {

                    summaryDisco.textContent =
                        "—";

                }

            }


            if (summaryMeterType) {

                if (
                    meterType &&
                    meterType.value
                ) {

                    summaryMeterType.textContent =
                        meterType.options[
                            meterType.selectedIndex
                        ].text;

                } else {

                    summaryMeterType.textContent =
                        "—";

                }

            }


            if (summaryMeterNumber) {

                summaryMeterNumber.textContent =
                    meterNumber &&
                    meterNumber.value.trim()
                        ? meterNumber.value.trim()
                        : "—";

            }


            if (summaryElectricityAmount) {

                const amount =
                    electricityAmount
                        ? Number(
                            electricityAmount.value
                        ) || 0
                        : 0;


                summaryElectricityAmount.textContent =
                    formatNaira(amount);

            }

        }


        /* ================= PROVIDER CHANGE ================= */

        if (disco) {

            disco.addEventListener(
                "change",
                updateElectricitySummary
            );

        }


        /* ================= METER TYPE ================= */

        if (meterType) {

            meterType.addEventListener(
                "change",
                updateElectricitySummary
            );

        }


        /* ================= METER NUMBER ================= */

        if (meterNumber) {

            meterNumber.addEventListener(
                "input",
                updateElectricitySummary
            );

        }


        /* ================= AMOUNT ================= */

        if (electricityAmount) {

            electricityAmount.addEventListener(
                "input",
                updateElectricitySummary
            );

        }


        /* ================= ELECTRICITY SUBMIT ================= */

        electricityForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (
                    !disco ||
                    !disco.value
                ) {

                    alert(
                        "Please select your electricity provider."
                    );

                    return;

                }


                if (
                    !meterType ||
                    !meterType.value
                ) {

                    alert(
                        "Please select your meter type."
                    );

                    return;

                }


                const meter =
                    meterNumber
                        ? meterNumber.value.trim()
                        : "";


                if (!meter) {

                    alert(
                        "Please enter your meter number."
                    );

                    if (meterNumber) {
                        meterNumber.focus();
                    }

                    return;

                }


                const amount =
                    electricityAmount
                        ? Number(
                            electricityAmount.value
                        )
                        : 0;


                if (
                    !amount ||
                    amount < 100
                ) {

                    alert(
                        "Minimum electricity payment is ₦100."
                    );

                    if (electricityAmount) {
                        electricityAmount.focus();
                    }

                    return;

                }


                alert(
                    "Electricity Payment\n\n" +

                    "Provider: " +
                    disco.options[
                        disco.selectedIndex
                    ].text +

                    "\nMeter Type: " +
                    meterType.options[
                        meterType.selectedIndex
                    ].text +

                    "\nMeter Number: " +
                    meter +

                    "\nAmount: " +
                    formatNaira(amount) +

                    "\n\n" +

                    "Payment processing will be connected soon."
                );

            }
        );


        updateElectricitySummary();

    }



    /* =====================================================
       5. EXAM PIN SERVICE
    ===================================================== */

    const examForm =
        document.getElementById(
            "examForm"
        );


    if (examForm) {

        const examType =
            document.getElementById(
                "examType"
            );

        const quantity =
            document.getElementById(
                "examQuantity"
            );


        const summaryExam =
            document.getElementById(
                "summaryExam"
            );

        const summaryQuantity =
            document.getElementById(
                "summaryQuantity"
            );

        const summaryExamPrice =
            document.getElementById(
                "summaryExamPrice"
            );

        const summaryExamTotal =
            document.getElementById(
                "summaryExamTotal"
            );


        /* ================= EXAM PRICES ================= */

        /*
           TEMPORARY DEMO PRICES.
           Replace with real API prices later.
        */

        const examPrices = {

            waec: 4500,

            neco: 3500,

            nabteb: 4000

        };


        /* ================= UPDATE EXAM SUMMARY ================= */

        function updateExamSummary() {

            const selectedExam =
                examType
                    ? examType.value
                    : "";


            const examQuantity =
                quantity
                    ? Number(quantity.value) || 0
                    : 0;


            const price =
                selectedExam &&
                examPrices[selectedExam]
                    ? examPrices[selectedExam]
                    : 0;


            if (summaryExam) {

                if (
                    examType &&
                    examType.value
                ) {

                    summaryExam.textContent =
                        examType.options[
                            examType.selectedIndex
                        ].text;

                } else {

                    summaryExam.textContent =
                        "—";

                }

            }


            if (summaryQuantity) {

                summaryQuantity.textContent =
                    examQuantity || 0;

            }


            if (summaryExamPrice) {

                summaryExamPrice.textContent =
                    formatNaira(price);

            }


            if (summaryExamTotal) {

                summaryExamTotal.textContent =
                    formatNaira(
                        price * examQuantity
                    );

            }

        }


        /* ================= EXAMINATION CHANGE ================= */

        if (examType) {

            examType.addEventListener(
                "change",
                updateExamSummary
            );

        }


        /* ================= QUANTITY CHANGE ================= */

        if (quantity) {

            quantity.addEventListener(
                "input",
                updateExamSummary
            );

        }


        /* ================= EXAM SUBMIT ================= */

        examForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const selectedExam =
                    examType
                        ? examType.value
                        : "";


                const examQuantity =
                    quantity
                        ? Number(quantity.value)
                        : 0;


                if (!selectedExam) {

                    alert(
                        "Please select an examination."
                    );

                    return;

                }


                if (
                    !examQuantity ||
                    examQuantity < 1
                ) {

                    alert(
                        "Please enter a valid quantity."
                    );

                    if (quantity) {
                        quantity.focus();
                    }

                    return;

                }


                const price =
                    examPrices[selectedExam];


                if (!price) {

                    alert(
                        "Price for this examination is not available."
                    );

                    return;

                }


                const total =
                    price * examQuantity;


                const examName =
                    examType.options[
                        examType.selectedIndex
                    ].text;


                alert(
                    "Exam PIN Order\n\n" +

                    "Examination: " +
                    examName +

                    "\nQuantity: " +
                    examQuantity +

                    "\nPrice per PIN: " +
                    formatNaira(price) +

                    "\nTotal: " +
                    formatNaira(total) +

                    "\n\n" +

                    "Payment processing will be connected soon."
                );

            }
        );


        updateExamSummary();

    }


});