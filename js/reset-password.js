/* =========================
   JODEK PAY — RESET PASSWORD
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
   RESET PASSWORD
========================= */

const resetPasswordForm =
    document.getElementById(
        "resetPasswordForm"
    );


if (resetPasswordForm) {

    resetPasswordForm.addEventListener(
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
               GET PASSWORDS
            ========================= */

            const newPassword =
                document
                    .getElementById("newPassword")
                    .value;


            const confirmPassword =
                document
                    .getElementById(
                        "confirmNewPassword"
                    )
                    .value;


            /* =========================
               PASSWORD LENGTH
            ========================= */

            if (newPassword.length < 8) {

                alert(
                    "Password must contain at least 8 characters."
                );

                return;

            }


            /* =========================
               PASSWORD STRENGTH
            ========================= */

            if (
                !/[A-Z]/.test(newPassword) ||
                !/[a-z]/.test(newPassword) ||
                !/[0-9]/.test(newPassword) ||
                !/[^A-Za-z0-9]/.test(newPassword)
            ) {

                alert(
                    "Password must contain uppercase, lowercase, number and special character."
                );

                return;

            }


            /* =========================
               CONFIRM PASSWORD
            ========================= */

            if (
                newPassword !==
                confirmPassword
            ) {

                alert(
                    "Passwords do not match."
                );

                return;

            }


            /* =========================
               UPDATE PASSWORD
            ========================= */

            try {

                const { error } =
                    await supabaseClient
                        .auth
                        .updateUser({
                            password:
                                newPassword
                        });


                if (error) {

                    console.error(error);

                    alert(
                        "Password update failed.\n\n" +
                        error.message
                    );

                    return;

                }


                /* =========================
                   SUCCESS
                ========================= */

                alert(
                    "Password updated successfully! 🎉\n\n" +
                    "You can now log in with your new password."
                );


                window.location.replace(
                    "login.html"
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
