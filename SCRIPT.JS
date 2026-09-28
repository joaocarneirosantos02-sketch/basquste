/* =========================================================
BASKETZONE
SCRIPT.JS
========================================================= */

"use strict";

/* =========================================================
INICIALIZAÇÃO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

/* =====================================================
   ELEMENTOS
====================================================== */

const header =
    document.getElementById("header");

const menuButton =
    document.getElementById("menuButton");

const nav =
    document.getElementById("nav");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("main section[id]");

const enterButton =
    document.getElementById("enterButton");

const contactForm =
    document.getElementById("contactForm");

const nome =
    document.getElementById("nome");/* =========================================================
BASKETZONE
SCRIPT.JS
========================================================= */

"use strict";

/* =========================================================
INICIALIZAÇÃO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

/* =====================================================
   ELEMENTOS
====================================================== */

const header =

const email =
    document.getElementById("email");

const nomeError =
    document.getElementById("nomeError");

const emailError =
    document.getElementById("emailError");

const formMessage =
    document.getElementById("formMessage");

const backToTop =/* =========================================================
BASKETZONE
SCRIPT.JS
========================================================= */

"use strict";

/* =========================================================
INICIALIZAÇÃO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

/* =====================================================
   ELEMENTOS
====================================================== */

const header =
    document.getElementById("header");

const menuButton =
    document.getElementById("menuButton");

const nav =
    document.getElementById("nav");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("main section[id]");

const enterButton =
    document.getElementById("enterButton");

const contactForm =
    document.getElementById("contactForm");

const nome =
    document.getElementById("nome");

const email =
    document.getElementById("email");

const nomeError =
    document.getElementById("nomeError");

const emailError =
    document.getElementById("emailError");

const formMessage =
    document.getElementById("backToTop");

const year =
    document.getElementById("year");


/* =====================================================
   ANO AUTOMÁTICO
====================================================== */

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =====================================================
   HEADER AO ROLAR
====================================================== */

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


/* =====================================================
   MENU MOBILE
====================================================== */

function toggleMenu() {

    if (!nav || !menuButton) return;

    const isOpen =
        nav.classList.toggle("open");

    menuButton.classList.toggle(
        "active",
        isOpen
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen
            ? "Fechar menu"
            : "Abrir menu"
    );

}


menuButton?.addEventListener(
    "click",
    toggleMenu
);


/* =====================================================
   FECHAR MENU AO CLICAR
====================================================== */

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            if (!nav || !menuButton) {
                return;
            }

            nav.classList.remove("open");

            menuButton.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "menu-open"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );

});


/* =====================================================
   ESC FECHA MENU
====================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        nav?.classList.remove("open");

        menuButton?.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "menu-open"
        );

        menuButton?.setAttribute(
            "aria-expanded",
            "false"
        );

    }
);


/* =====================================================
   NAVEGAÇÃO ATIVA
====================================================== */

function updateActiveLink() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionBottom =
            sectionTop +
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach(link => {

        const target =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${currentSection}`
        );

    });

}


/* =====================================================
   ANIMAÇÕES AO ENTRAR NA TELA
====================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add(
            "visible"
        );

    });

}


/* =====================================================
   BOTÃO ENTRAR EM QUADRA
====================================================== */

enterButton?.addEventListener(
    "click",
    () => {

        const about =
            document.getElementById("sobre");

        about?.scrollIntoView({
            behavior: "smooth"
        });

        showNotification(
            "🏀 Bem-vindo à BasketZone!",
            "success"
        );

    }
);


/* =====================================================
   FORMULÁRIO
====================================================== */

contactForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        clearForm();

        const nomeValue =
            nome.value.trim();

        const emailValue =
            email.value.trim();

        let valid = true;


        /* ---------------------------------------------
           VALIDAR NOME
        ---------------------------------------------- */

        if (nomeValue.length < 2) {

            setError(
                nome,
                nomeError,
                "Digite seu nome."
            );

            valid = false;

        }


        /* ---------------------------------------------
           VALIDAR E-MAIL
        ---------------------------------------------- */

        if (
            !isValidEmail(
                emailValue
            )
        ) {

            setError(
                email,
                emailError,
                "Digite um e-mail válido."
            );

            valid = false;

        }


        /* ---------------------------------------------
           SE HOUVER ERRO
        ---------------------------------------------- */

        if (!valid) {

            showFormMessage(
                "Confira os campos destacados.",
                "error"
            );

            return;

        }


        /* ---------------------------------------------
           SUCESSO
        ---------------------------------------------- */

        showFormMessage(
            `🔥 Valeu, ${escapeHTML(nomeValue)}! Cadastro realizado com sucesso!`,
            "success"
        );


        contactForm.reset();

        nome.focus();

    }
);


/* =====================================================
   VALIDAÇÃO EM TEMPO REAL — NOME
====================================================== */

nome?.addEventListener(
    "input",
    () => {

        const value =
            nome.value.trim();

        if (value.length >= 2) {

            nome.classList.remove(
                "input-error"
            );

            nome.classList.add(
                "input-success"
            );

            nomeError.textContent = "";

        }

    }
);


/* =====================================================
   VALIDAÇÃO EM TEMPO REAL — E-MAIL
====================================================== */

email?.addEventListener(
    "input",
    () => {

        const value =
            email.value.trim();

        if (
            isValidEmail(value)
        ) {

            email.classList.remove(
                "input-error"
            );

            email.classList.add(
                "input-success"
            );

            emailError.textContent = "";

        }

    }
);


/* =====================================================
   VOLTAR AO TOPO
====================================================== */

function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add(
            "visible"
        );

    } else {

        backToTop.classList.remove(
            "visible"
        );

    }

}


backToTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =====================================================
   VALIDAR E-MAIL
====================================================== */

function isValidEmail(value) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(value);

}


/* =====================================================
   MOSTRAR ERRO
====================================================== */

function setError(
    input,
    errorElement,
    message
) {

    input.classList.add(
        "input-error"
    );

    input.classList.remove(
        "input-success"
    );

    errorElement.textContent =
        message;

}


/* =====================================================
   LIMPAR FORMULÁRIO
====================================================== */

function clearForm() {

    nome.classList.remove(
        "input-error",
        "input-success"
    );

    email.classList.remove(
        "input-error",
        "input-success"
    );

    nomeError.textContent = "";

    emailError.textContent = "";

    formMessage.textContent = "";

    formMessage.className =
        "form-message";

}


/* =====================================================
   MENSAGEM DO FORMULÁRIO
====================================================== */

function showFormMessage(
    message,
    type
) {

    formMessage.textContent =
        message;

    formMessage.className =
        `form-message ${type}`;

}


/* =====================================================
   ESCAPAR HTML
====================================================== */

function escapeHTML(value) {

    const element =
        document.createElement("div");

    element.textContent =
        value;

    return element.innerHTML;

}


/* =====================================================
   NOTIFICAÇÃO
====================================================== */

function showNotification(
    message,
    type = "success"
) {

    const oldNotification =
        document.querySelector(
            ".notification"
        );

    oldNotification?.remove();


    const notification =
        document.createElement("div");

    notification.className =
        `notification ${type}`;

    notification.textContent =
        message;


    Object.assign(
        notification.style,
        {
            position: "fixed",
            left: "50%",
            bottom: "30px",
            transform:
                "translate(-50%, 30px)",
            padding:
                "14px 22px",
            background:
                "#181818",
            color:
                "#ffffff",
            border:
                "1px solid rgba(255,107,0,.4)",
            boxShadow:
                "0 15px 40px rgba(0,0,0,.4)",
            fontSize:
                "12px",
            fontWeight:
                "600",
            zIndex:
                "9999",
            opacity:
                "0",
            transition:
                "all .4s ease"
        }
    );


    document.body.appendChild(
        notification
    );


    requestAnimationFrame(() => {

        notification.style.opacity =
            "1";

        notification.style.transform =
            "translate(-50%, 0)";

    });


    setTimeout(() => {

        notification.style.opacity =
            "0";

        notification.style.transform =
            "translate(-50%, 20px)";


        setTimeout(() => {

            notification.remove();

        }, 400);

    }, 3000);

}


/* =====================================================
   EVENTO DE SCROLL
====================================================== */

window.addEventListener(
    "scroll",
    () => {

        updateHeader();

        updateActiveLink();

        updateBackToTop();

    },
    {
        passive: true
    }
);


/* =====================================================
   EXECUÇÃO INICIAL
====================================================== */

updateHeader();

updateActiveLink();

updateBackToTop();

});