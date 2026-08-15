/* =========================================================
   JODEK PAY — PROFILE
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

    /* =====================================================
       SUPABASE CONNECTION
    ===================================================== */

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

        return;

    }


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const profileForm =
        document.getElementById("profileForm");

    const fullName =
        document.getElementById("fullName");

    const email =
        document.getElementById("email");

    const phone =
        document.getElementById("phone");

    const userId =
        document.getElementById("userId");

    const saveProfileBtn =
        document.getElementById("saveProfileBtn");


    /* =====================================================
       CHECK LOGIN
    ===================================================== */

    const {
        data: {
            user
        },
        error: userError
    } =
        await supabaseClient.auth.getUser();


    if (userError || !user) {

        console.error(
            "User authentication error:",
            userError
        );

        window.location.replace(
            "login.html"
        );

        return;

    }


    /* =====================================================
       LOAD PROFILE
    ===================================================== */

    async function loadProfile() {

        try {

            /* USER ID */

            if (userId) {

                userId.value =
                    user.id;

            }


            /* EMAIL */

            if (email) {

                email.value =
                    user.email || "";

                /*
                   Email belongs to Supabase Auth.
                   We don't update it from this form.
                */

                email.readOnly = true;

            }


            /* GET PROFILE */

            const {
                data: profile,
                error
            } =
                await supabaseClient
                    .from("profiles")
                    .select(
                        "full_name, phone, status"
                    )
                    .eq(
                        "id",
                        user.id
                    )
                    .maybeSingle();


            if (error) {

                console.error(
                    "Profile loading error:",
                    error
                );

                return;

            }


            /* PROFILE EXISTS */

            if (profile) {

                if (fullName) {

                    fullName.value =
                        profile.full_name || "";

                }


                if (phone) {

                    phone.value =
                        profile.phone || "";

                }


                const accountStatus =
                    document.getElementById(
                        "accountStatus"
                    );


                if (accountStatus) {

                    accountStatus.textContent =
                        profile.status ||
                        "Active";

                }

            }

        }

        catch (error) {

            console.error(
                "Unexpected profile error:",
                error
            );

        }

    }


    /* =====================================================
       SAVE PROFILE
    ===================================================== */

    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const nameValue =
                    fullName.value.trim();

                const phoneValue =
                    phone.value.trim();


                /* ================= VALIDATION ================= */

                if (!nameValue) {

                    alert(
                        "Please enter your full name."
                    );

                    fullName.focus();

                    return;

                }


                if (
                    phoneValue &&
                    !/^[0-9]{11}$/.test(
                        phoneValue
                    )
                ) {

                    alert(
                        "Please enter a valid 11-digit Nigerian phone number."
                    );

                    phone.focus();

                    return;

                }


                /* ================= BUTTON ================= */

                saveProfileBtn.disabled =
                    true;

                saveProfileBtn.textContent =
                    "Saving...";


                try {

                    /* ================= UPDATE ================= */

                    const {
                        error
                    } =
                        await supabaseClient
                            .from("profiles")
                            .update({

                                full_name:
                                    nameValue,

                                phone:
                                    phoneValue

                            })
                            .eq(
                                "id",
                                user.id
                            );


                    if (error) {

                        console.error(
                            "Profile update error:",
                            error
                        );

                        alert(
                            "Unable to update your profile.\n\n" +
                            error.message
                        );

                        return;

                    }


                    /* ================= SUCCESS ================= */

                    alert(
                        "Profile updated successfully! ✓"
                    );

                }

                catch (error) {

                    console.error(
                        "Unexpected update error:",
                        error
                    );

                    alert(
                        "Something went wrong.\n\n" +
                        "Please try again."
                    );

                }

                finally {

                    saveProfileBtn.disabled =
                        false;

                    saveProfileBtn.textContent =
                        "Save Changes";

                }

            }
        );

    }


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    await loadProfile();

});