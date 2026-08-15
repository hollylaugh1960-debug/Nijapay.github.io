/* =========================
   SUPABASE CONNECTION
========================= */

const SUPABASE_URL =
    "https://hojvlkiqdtiribxnhzlh.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_rTw950d9-u9DxmsQJFh8Yw__3W7CKN8";

let supabaseClient = null;

if (window.supabase) {

    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );

} else {

    console.error(
        "Supabase library was not loaded."
    );

}


/* =========================
   PASSWORD SHOW / HIDE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const passwordToggles =
            document.querySelectorAll(
                ".password-toggle"
            );


        passwordToggles.forEach(
            function (toggle) {

                toggle.addEventListener(
                    "click",
                    function () {

                        const targetId =
                            this.dataset.target;

                        const passwordInput =
                            document.getElementById(
                                targetId
                            );


                        if (!passwordInput) {

                            console.error(
                                "Password input not found:",
                                targetId
                            );

                            return;

                        }


                        if (
                            passwordInput.type ===
                            "password"
                        ) {

                            passwordInput.type =
                                "text";

                            this.textContent =
                                "🙈";

                            this.setAttribute(
                                "aria-label",
                                "Hide password"
                            );

                        } else {

                            passwordInput.type =
                                "password";

                            this.textContent =
                                "👁️";

                            this.setAttribute(
                                "aria-label",
                                "Show password"
                            );

                        }

                    }
                );

            }
        );

    }
);


/* =========================
   REGISTRATION
========================= */

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    const passwordInput =
        document.getElementById(
            "password"
        );

    const strengthBar =
        document.getElementById(
            "strengthBar"
        );

    const strengthText =
        document.getElementById(
            "strengthText"
        );

    const strengthScore =
        document.getElementById(
            "strengthScore"
        );


    /* =========================
       PASSWORD STRENGTH
    ========================= */

    if (passwordInput) {

        passwordInput.addEventListener(
            "input",
            function () {

                const password =
                    this.value;

                let score = 0;


                const hasLength =
                    password.length >= 8;

                const hasUppercase =
                    /[A-Z]/.test(password);

                const hasLowercase =
                    /[a-z]/.test(password);

                const hasNumber =
                    /[0-9]/.test(password);

                const hasSpecial =
                    /[^A-Za-z0-9]/.test(
                        password
                    );


                if (hasLength) score++;

                if (hasUppercase) score++;

                if (hasLowercase) score++;

                if (hasNumber) score++;

                if (hasSpecial) score++;


                /* Requirements */

                const length =
                    document.getElementById(
                        "length"
                    );

                const uppercase =
                    document.getElementById(
                        "uppercase"
                    );

                const lowercase =
                    document.getElementById(
                        "lowercase"
                    );

                const number =
                    document.getElementById(
                        "number"
                    );

                const special =
                    document.getElementById(
                        "special"
                    );


                if (length) {

                    length.classList.toggle(
                        "valid",
                        hasLength
                    );

                }


                if (uppercase) {

                    uppercase.classList.toggle(
                        "valid",
                        hasUppercase
                    );

                }


                if (lowercase) {

                    lowercase.classList.toggle(
                        "valid",
                        hasLowercase
                    );

                }


                if (number) {

                    number.classList.toggle(
                        "valid",
                        hasNumber
                    );

                }


                if (special) {

                    special.classList.toggle(
                        "valid",
                        hasSpecial
                    );

                }


                /* Score */

                if (strengthScore) {

                    strengthScore.textContent =
                        score + "/5";

                }


                if (strengthBar) {

                    strengthBar.style.width =
                        (score * 20) + "%";

                }


                /* Text */

                if (strengthText) {

                    if (!password) {

                        strengthText.textContent =
                            "Password strength";

                    } else if (score <= 2) {

                        strengthText.textContent =
                            "Weak";

                    } else if (score === 3) {

                        strengthText.textContent =
                            "Medium";

                    } else if (score === 4) {

                        strengthText.textContent =
                            "Good";

                    } else {

                        strengthText.textContent =
                            "Strong";

                    }

                }

            }
        );

    }


    /* =========================
       REGISTER SUBMIT
    ========================= */

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* Check Supabase */

            if (!supabaseClient) {

                alert(
                    "Supabase connection is not available."
                );

                return;

            }


            /* Get form values */

            const fullName =
                document
                    .getElementById(
                        "fullName"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "phone"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "email"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "password"
                    )
                    .value;


            const confirmPassword =
                document
                    .getElementById(
                        "confirmPassword"
                    )
                    .value;


            const accountType =
                document.querySelector(
                    'input[name="accountType"]:checked'
                ).value;


            /* =========================
               PASSWORD VALIDATION
            ========================= */

            if (
                password.length < 8 ||
                !/[A-Z]/.test(password) ||
                !/[a-z]/.test(password) ||
                !/[0-9]/.test(password) ||
                !/[^A-Za-z0-9]/.test(
                    password
                )
            ) {

                alert(
                    "Please create a stronger password.\n\n" +
                    "Use at least 8 characters, " +
                    "including uppercase, lowercase, " +
                    "number and special character."
                );

                return;

            }


            /* =========================
               CONFIRM PASSWORD
            ========================= */

            if (
                password !==
                confirmPassword
            ) {

                alert(
                    "Passwords do not match."
                );

                return;

            }


            try {

                /* =========================
                   CREATE AUTH ACCOUNT
                ========================= */

                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .auth
                        .signUp({

                            email: email,

                            password: password

                        });


                if (error) {

                    alert(
                        error.message
                    );

                    return;

                }


                if (!data.user) {

                    alert(
                        "Registration could not be completed."
                    );

                    return;

                }


                /* =========================
                   CREATE PROFILE
                ========================= */

                const {
                    error: profileError
                } =
                    await supabaseClient
                        .from("profiles")
                        .insert({

                            id:
                                data.user.id,

                            full_name:
                                fullName,

                            phone:
                                phone,

                            role:
                                accountType,

                            status:
                                "active"

                        });


                if (profileError) {

                    console.error(
                        profileError
                    );

                    alert(
                        "Account was created, " +
                        "but your profile could " +
                        "not be saved.\n\n" +
                        profileError.message
                    );

                    return;

                }


                /* =========================
                   CREATE WALLET
                ========================= */

                const {
                    error: walletError
                } =
                    await supabaseClient
                        .from("wallets")
                        .insert({

                            user_id:
                                data.user.id,

                            balance:
                                0.00

                        });


                if (walletError) {

                    console.error(
                        walletError
                    );

                    alert(
                        "Account was created, " +
                        "but your wallet could " +
                        "not be created.\n\n" +
                        walletError.message
                    );

                    return;

                }


                /* =========================
                   SUCCESS
                ========================= */

                alert(
                    "Account created successfully! 🎉\n\n" +
                    "Welcome to Jodek Utility."
                );


                window.location.replace(
                    "login.html"
                );

            }


            catch (error) {

                console.error(
                    error
                );

                alert(
                    "Something went wrong during registration.\n\n" +
                    "Please try again."
                );

            }

        }
    );

}


/* =========================
   LOGIN
========================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* Get login details */

            const identifier =
                document
                    .getElementById(
                        "loginIdentifier"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "loginPassword"
                    )
                    .value;


            /* Validate */

            if (
                !identifier ||
                !password
            ) {

                alert(
                    "Please enter your email and password."
                );

                return;

            }


            try {

                /* =========================
                   LOGIN
                ========================= */

                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .auth
                        .signInWithPassword({

                            email:
                                identifier,

                            password:
                                password

                        });


                /* Login failed */

                if (error) {

                    alert(
                        "Login failed.\n\n" +
                        error.message
                    );

                    return;

                }


                /* Check user */

                if (!data.user) {

                    alert(
                        "Login could not be completed."
                    );

                    return;

                }


                /* =========================
                   GO TO DASHBOARD
                ========================= */

                window.location.replace(
                    "dashboard.html"
                );

            }


            catch (error) {

                console.error(
                    error
                );

                alert(
                    "Something went wrong during login.\n\n" +
                    "Please try again."
                );

            }

        }
    );

}