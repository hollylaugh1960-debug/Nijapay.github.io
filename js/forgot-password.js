/* =========================
   JODEK PAY — FORGOT PASSWORD
========================= */

const SUPABASE_URL =
    "https://hojvlkiqdtiribxnhzlh.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_rTw950d9-u9DxmsQJFh8Yw__3W7CKN8";

let supabaseClient = null;


/* =========================
   SUPABASE CONNECTION
========================= */

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
   FORGOT PASSWORD
========================= */

const forgotPasswordForm =
    document.getElementById(
        "forgotPasswordForm"
    );


if (forgotPasswordForm) {

    forgotPasswordForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* =========================
               CHECK SUPABASE
            ========================= */

            if (!supabaseClient) {

                alert(
                    "Supabase connection is not available."
                );

                return;

            }


            /* =========================
               GET EMAIL
            ========================= */

            const email =
                document
                    .getElementById("forgotEmail")
                    .value
                    .trim();


            /* =========================
               VALIDATE EMAIL
            ========================= */

            if (!email) {

                alert(
                    "Please enter your email address."
                );

                return;

            }


            /* =========================
               SEND RESET LINK
            ========================= */

            try {

                const { error } =
                    await supabaseClient
                        .auth
                        .resetPasswordForEmail(
                            email,
                            {
                                redirectTo:
                                    window.location.origin +
                                    "/reset-password.html"
                            }
                        );


                /* =========================
                   ERROR
                ========================= */

                if (error) {

                    console.error(error);

                    alert(
                        "Unable to send reset link.\n\n" +
                        error.message
                    );

                    return;

                }


                /* =========================
                   SUCCESS
                ========================= */

                alert(
                    "Password reset link sent successfully.\n\n" +
                    "Please check your email."
                );

            }


            catch (error) {

                console.error(error);

                alert(
                    "Something went wrong.\n\n" +
                    "Please try again."
                );

            }

        }
    );

}