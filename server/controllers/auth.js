const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
    if (req.user) {
      return res.status(200).json({ message: "obtained user info successfully." });
    }
    res.render("login", {
      title: "Login",
    });
  };

exports.postLogin = (req, res, next) => {
    /*const validationErrors = [];
    if (!validator.isEmail(req.body.email))
        validationErrors.push({ msg: "Please enter a valid email address." });
    if (validator.isEmpty(req.body.password))
        validationErrors.push({ msg: "Password cannot be blank." });

    if (validationErrors.length) {
        req.flash("errors", validationErrors);
        return res.redirect("/login");
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false,
    });*/

passport.authenticate("local", (err, user, info) => {
    if (err) {
    return next(err);
    }
    if (!user) {
    req.flash("errors", info);
    return res.redirect("/login");
    }
    req.logIn(user, (err) => {
    if (err) {
        return next(err);
    }
    req.flash("success", { msg: "Success! You are logged in." });
    return res.status(200).json({ message: "Logged in successfully." });
    /*res.redirect(req.session.returnTo || "/");*/
    });
})(req, res, next);
};

exports.logout = (req, res) => {
    /*req.logout(() => {
        console.log('User has logged out.')
    })*/
    req.session.destroy((err) => {
        if (err)
        console.log("Error : Failed to destroy the session during logout.", err);
        /*req.user = null;*/
        return res.status(200).json({ message: "Logged out successfully." });
    });
    };

exports.getSignup = (req, res) => {
if (req.user) {
    return res.redirect("/profile");
}
res.render("signup", {
    title: "Create Account",
});
};

exports.postSignup = (req, res, next) => {
    const user = new User({
        userName: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    User.findOne({ userName: req.body.username })
        .then(existingUser => {
            if (existingUser) {
                req.flash("errors", {
                    msg: "Account with that username already exists.",
                });
                return res.redirect("http://localhost:3000/");
            }
            user.save()
                .then(() => {
                    req.logIn(user, (err) => {
                        if (err) {
                            return next(err);
                        }
                        // Successfully signed up the user
                        // Redirect to the desired page
                        /*return res.redirect("http://localhost:3000/");*/
                        return res.status(200).json({ message: "User registered successfully." });
                    });
                })
                .catch(err => {
                    return next(err);
                });
        })
        .catch(err => {
            return next(err);
        });
};