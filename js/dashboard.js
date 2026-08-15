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
    "Supabase client created:",
    !!supabaseClient
);


/* =========================
   ELEMENTS
========================= */

const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.querySelector(".sidebar");

const logoutBtn =
    document.getElementById("logoutBtn");


/* =========================
   MOBILE SIDEBAR
========================= */

if (menuBtn && sidebar) {

    menuBtn.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            sidebar.classList.toggle("open");

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                sidebar.classList.contains("open") &&
                !sidebar.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                sidebar.classList.remove("open");

            }

        }
    );


    const sidebarLinks =
        sidebar.querySelectorAll("nav a");


    sidebarLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    sidebar.classList.remove(
                        "open"
                    );

                }
            );

        }
    );

}


/* =========================
   LOAD LOGGED-IN USER
========================= */

async function loadUser() {

    try {

        const {
            data: {
                user
            },
            error
        } =
            await supabaseClient
                .auth
                .getUser();


        console.log(
            "Auth user:",
            user
        );

        console.log(
            "Auth error:",
            error
        );


        /* NO LOGGED-IN USER */

        if (error || !user) {

            window.location.replace(
                "login.html"
            );

            return;

        }


        /* =========================
           GET PROFILE
        ========================= */

        const {
            data: profile,
            error: profileError
        } =
            await supabaseClient
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();


        console.log(
            "Profile:",
            profile
        );

        console.log(
            "Profile error:",
            profileError
        );


        if (profileError) {

            console.error(
                "Profile error:",
                profileError
            );

            return;

        }


        /* =========================
           DASHBOARD NAME
        ========================= */

        const userName =
            document.getElementById(
                "userName"
            );


        if (userName) {

            userName.textContent =
                profile.full_name ||
                "User";

        }


        /* =========================
           DASHBOARD AVATAR
        ========================= */

        const userAvatar =
            document.getElementById(
                "userAvatar"
            );


        if (userAvatar) {

            const name =
                profile.full_name ||
                "User";


            userAvatar.textContent =
                name
                    .charAt(0)
                    .toUpperCase();

        }


        /* =========================
           PROFILE NAME
        ========================= */

        const profileName =
            document.getElementById(
                "profileName"
            );


        if (profileName) {

            profileName.textContent =
                profile.full_name ||
                "Not provided";

        }


        /* =========================
           PROFILE EMAIL
        ========================= */

        const profileEmail =
            document.getElementById(
                "profileEmail"
            );


        if (profileEmail) {

            profileEmail.textContent =
                user.email ||
                "Not provided";

        }


        /* =========================
           PROFILE PHONE
        ========================= */

        const profilePhone =
            document.getElementById(
                "profilePhone"
            );


        if (profilePhone) {

            profilePhone.textContent =
                profile.phone ||
                "Not provided";

        }


        /* =========================
           PROFILE ACCOUNT TYPE
        ========================= */

        const profileRole =
            document.getElementById(
                "profileRole"
            );


        if (profileRole) {

            profileRole.textContent =
                profile.role === "agent"
                    ? "Agent"
                    : "Customer";

        }


        /* =========================
           PROFILE STATUS
        ========================= */

        const profileStatus =
            document.getElementById(
                "profileStatus"
            );


        if (profileStatus) {

            profileStatus.textContent =
                profile.status ||
                "Active";

        }


        /* =========================
           PROFILE AVATAR
        ========================= */

        const profileAvatar =
            document.getElementById(
                "profileAvatar"
            );


        if (profileAvatar) {

            const name =
                profile.full_name ||
                "User";


            profileAvatar.textContent =
                name
                    .charAt(0)
                    .toUpperCase();

        }

    }

    catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

        window.location.replace(
            "login.html"
        );

    }

}


/* =========================
   LOGOUT
========================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async function () {

            logoutBtn.disabled = true;

            logoutBtn.textContent =
                "Logging out...";


            const {
                error
            } =
                await supabaseClient
                    .auth
                    .signOut();


            if (error) {

                console.error(
                    error
                );

                alert(
                    "Unable to logout.\n\n" +
                    error.message
                );

                logoutBtn.disabled = false;

                logoutBtn.innerHTML =
                    "🚪 <span>Logout</span>";

                return;

            }


            window.location.replace(
                "login.html"
            );

        }
    );

}


/* =========================
   LOAD WALLET BALANCE
========================= */

async function loadWalletBalance() {

    const walletBalance =
        document.getElementById(
            "walletBalance"
        );


    if (!walletBalance) {
        return;
    }


    try {

        /* GET LOGGED-IN USER */

        const {
            data: {
                user
            },
            error: userError
        } =
            await supabaseClient
                .auth
                .getUser();


        if (userError) {

            console.error(
                "User error:",
                userError
            );

            return;

        }


        if (!user) {

            console.error(
                "No logged-in user."
            );

            return;

        }


        /* =========================
           GET WALLET
        ========================= */

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


        console.log(
            "Wallet balance:",
            wallet?.balance
        );


        console.log(
            "Wallet object:",
            JSON.stringify(wallet)
        );


        if (walletError) {

            console.error(
                "Wallet error:",
                walletError
            );

            return;

        }


        /* =========================
           DISPLAY BALANCE
        ========================= */

        walletBalance.textContent =
            "₦" +
            Number(
                wallet.balance || 0
            ).toLocaleString(
                "en-NG",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
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


/* =========================
   LOAD RECENT TRANSACTIONS
========================= */

async function loadRecentTransactions() {

    const transactionsList =
        document.getElementById(
            "transactionsList"
        );


    if (!transactionsList) {
        return;
    }


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


        if (userError || !user) {

            console.error(
                "User not found:",
                userError
            );

            return;

        }


        /* =========================
           GET TRANSACTIONS
        ========================= */

        const {
            data: transactions,
            error: transactionError
        } =
            await supabaseClient
                .from("transactions")
                .select(
                    "id, type, service, amount, status, description, reference, created_at"
                )
                .eq(
                    "user_id",
                    user.id
                )
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                )
                .limit(5);


        console.log(
            "Transactions:",
            transactions
        );


        console.log(
            "Transaction error:",
            transactionError
        );


        if (transactionError) {

            console.error(
                "Transaction error:",
                transactionError
            );


            transactionsList.innerHTML = `

                <div class="empty-transactions">

                    <div>⚠️</div>

                    <h4>
                        Unable to load transactions
                    </h4>

                    <p>
                        Please try again later.
                    </p>

                </div>

            `;

            return;

        }


        /* =========================
           NO TRANSACTIONS
        ========================= */

        if (
            !transactions ||
            transactions.length === 0
        ) {

            transactionsList.innerHTML = `

                <div class="empty-transactions">

                    <div>📋</div>

                    <h4>
                        No transactions yet
                    </h4>

                    <p>
                        Your recent transactions
                        will appear here.
                    </p>

                </div>

            `;

            return;

        }


        /* =========================
           DISPLAY TRANSACTIONS
        ========================= */

        transactionsList.innerHTML =
            transactions.map(
                function (transaction) {

                    const type =
                        String(
                            transaction.type ||
                            ""
                        ).toLowerCase();


                    const isCredit =
                        type.includes("fund") ||
                        type.includes("credit");


                    const sign =
                        isCredit
                            ? "+"
                            : "-";


                    const amount =
                        Number(
                            transaction.amount ||
                            0
                        ).toLocaleString(
                            "en-NG",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        );


                    const date =
                        new Date(
                            transaction.created_at
                        ).toLocaleDateString(
                            "en-NG",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                            }
                        );


                    return `

                        <div class="transaction-item">

                            <div class="transaction-icon">
                                ${
                                    isCredit
                                        ? "💰"
                                        : "🛒"
                                }
                            </div>


                            <div class="transaction-details">

                                <strong>
                                    ${
                                        transaction.description ||
                                        transaction.type ||
                                        "Transaction"
                                    }
                                </strong>

                                <small>
                                    ${date}
                                </small>

                            </div>


                            <div class="transaction-amount">

                                <strong class="${
                                    isCredit
                                        ? "credit"
                                        : "debit"
                                }">

                                    ${sign}₦${amount}

                                </strong>

                                <small>
                                    ${
                                        transaction.status ||
                                        "pending"
                                    }
                                </small>

                            </div>

                        </div>

                    `;

                }
            ).join("");

    }

    catch (error) {

        console.error(
            "Could not load transactions:",
            error
        );


        transactionsList.innerHTML = `

            <div class="empty-transactions">

                <div>⚠️</div>

                <h4>
                    Unable to load transactions
                </h4>

                <p>
                    Please refresh and try again.
                </p>

            </div>

        `;

    }

}


/* =========================
   FUND WALLET MODAL
========================= */

const fundWalletBtn =
    document.getElementById(
        "fundWalletBtn"
    );


const fundWalletModal =
    document.getElementById(
        "fundWalletModal"
    );


const closeFundModal =
    document.getElementById(
        "closeFundModal"
    );


const fundWalletForm =
    document.getElementById(
        "fundWalletForm"
    );


const fundAmount =
    document.getElementById(
        "fundAmount"
    );


/* =========================
   OPEN MODAL
========================= */

if (
    fundWalletBtn &&
    fundWalletModal
) {

    fundWalletBtn.addEventListener(
        "click",
        function () {

            fundWalletModal.classList.add(
                "active"
            );


            fundWalletModal.setAttribute(
                "aria-hidden",
                "false"
            );


            if (fundAmount) {

                fundAmount.focus();

            }

        }
    );

}


/* =========================
   CLOSE MODAL FUNCTION
========================= */

function closeFundWalletModal() {

    if (!fundWalletModal) {
        return;
    }


    /*
     * IMPORTANT:
     * Move focus OUT of the modal
     * BEFORE applying aria-hidden.
     */

    if (
        fundWalletBtn &&
        document.activeElement &&
        fundWalletModal.contains(
            document.activeElement
        )
    ) {

        fundWalletBtn.focus();

    }


    /* Hide modal */

    fundWalletModal.classList.remove(
        "active"
    );


    fundWalletModal.setAttribute(
        "aria-hidden",
        "true"
    );


    /* Reset form */

    if (fundWalletForm) {

        fundWalletForm.reset();

    }

}


/* =========================
   CLOSE BUTTON
========================= */

if (closeFundModal) {

    closeFundModal.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            closeFundWalletModal();

        }
    );

}


/* =========================
   CLOSE WHEN CLICKING OUTSIDE
========================= */

if (fundWalletModal) {

    fundWalletModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                fundWalletModal
            ) {

                closeFundWalletModal();

            }

        }
    );

}


/* =========================
   CLOSE WITH ESCAPE
========================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            fundWalletModal &&
            fundWalletModal.classList.contains(
                "active"
            )
        ) {

            closeFundWalletModal();

        }

    }
);


/* =========================
   QUICK AMOUNTS
========================= */

const quickAmounts =
    document.querySelectorAll(
        ".quick-amount"
    );


quickAmounts.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                if (fundAmount) {

                    fundAmount.value =
                        this.dataset.amount;

                }

            }
        );

    }
);


/* =========================
   FUND WALLET FORM
========================= */

if (fundWalletForm) {

    fundWalletForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const amount =
                Number(
                    fundAmount.value
                );


            if (
                !amount ||
                amount < 100
            ) {

                alert(
                    "Please enter an amount of at least ₦100."
                );

                return;

            }


            /*
             * PAYMENT GATEWAY
             * WILL BE CONNECTED HERE
             */

            alert(
                "Funding amount: ₦" +
                amount.toLocaleString(
                    "en-NG"
                ) +
                "\n\nPayment gateway will be connected next."
            );

        }
    );

}


/* =========================
   VERIFY PAYSTACK PAYMENT
========================= */

async function verifyPaystackPayment() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const reference =
        params.get("reference");


    if (!reference) {

        return;

    }


    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .functions
                .invoke(
                    "verify-payment",
                    {
                        body: {
                            reference:
                                reference
                        }
                    }
                );


        if (error) {

            console.error(
                "Payment verification error:",
                error
            );


            alert(
                "We could not verify your payment. " +
                "Please contact support if money was deducted."
            );


            return;

        }


        if (
            !data ||
            !data.success
        ) {

            alert(
                data?.message ||
                data?.error ||
                "Payment was not completed."
            );


            return;

        }


        /* PAYMENT SUCCESS */

        alert(
            "Payment successful!\n\n" +
            "₦" +
            Number(
                data.amount
            ).toLocaleString(
                "en-NG",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            ) +
            " has been added to your wallet."
        );


        /* UPDATE BALANCE */

        const walletBalance =
            document.getElementById(
                "walletBalance"
            );


        if (walletBalance) {

            walletBalance.textContent =
                "₦" +
                Number(
                    data.balance
                ).toLocaleString(
                    "en-NG",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                );

        }


        /* REMOVE REFERENCE */

        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );


        /* RELOAD TRANSACTIONS */

        loadRecentTransactions();


    }

    catch (error) {

        console.error(
            "Payment verification error:",
            error
        );


        alert(
            "Something went wrong while verifying your payment."
        );

    }

}


/* =========================
   START DASHBOARD
========================= */

loadUser();

loadWalletBalance();

loadRecentTransactions();

verifyPaystackPayment();
