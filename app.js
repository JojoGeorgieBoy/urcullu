const lawyersData = {
  "urcullu-steffen": {
    name: "Félix Urcullú Steffen",
    charge: "Socio Principal y Fundador",
    img: "assets/hyu_FelixUrculluSteffen.jpeg",
    description: "Félix Urcullú Steffen es el pilar estratégico y socio fundador del estudio. Cuenta con una trayectoria de primer nivel en el derecho civil y en la resolución de litigios complejos en el sur de Chile. Reconocido por su capacidad de argumentación y su profundo rigor analítico, ha liderado con éxito defensas de alta complejidad patrimonial ante las cortes más exigentes del país. Su visión del derecho inspira el estándar ético y profesional de toda la firma.",
    specialties: [
      "Derecho Civil y de Contratos de Alta Complejidad.",
      "Litigación Compleja y Estrategia Procesal de Juicios Civiles.",
      "Resolución Alternativa de Conflictos y Arbitraje Comercial."
    ]
  },
  "soto-gidi": {
    name: "Agustín Soto Gidi",
    charge: "Abogado Asociado",
    img: "assets/hyu_AgustinSotoGidi.jpeg",
    description: "Agustín Soto Gidi destaca por su enfoque analítico y constitucional del derecho. Especializado en el diseño de defensas constitucionales y el diseño estratégico de litigios, aporta un valor diferencial al estudio en la detección y prevención temprana de brechas de cumplimiento legal corporativo (compliance). Su práctica se caracteriza por estructurar defensas preventivas rigurosas que blindan a las empresas frente a contingencias judiciales de diversa índole.",
    specialties: [
      "Derecho Constitucional y Recursos de Amparo y Protección.",
      "Asesoría Corporativa Preventiva y Compliance Legal.",
      "Gestión Temprana de Conflictos y Litigios de Alta Complejidad."
    ]
  },
  "urcullu-arriagada": {
    name: "Félix Urcullú Arriagada",
    charge: "Abogado Asociado",
    img: "assets/hyu_FelixUrculluArriagada.jpeg",
    description: "Félix Urcullú Arriagada enfoca su práctica en el área de derecho civil y la conducción estratégica de procedimientos judiciales ordinarios. Su dedicación constante al estudio minucioso de la jurisprudencia y su rigurosidad en la preparación probatoria garantizan una representación judicial sólida. Participa activamente en la representación de personas naturales y corporaciones frente a reclamaciones complejas de índole contractual y extracontractual.",
    specialties: [
      "Derecho de Obligaciones y Responsabilidad Civil Contractual.",
      "Litigación y Tramitación de Procedimientos Civiles Ordinarios.",
      "Derecho de Familia y Sucesiones."
    ]
  },
  "carter-holtehuer": {
    name: "Nicolás Carter Holtehuer",
    charge: "Abogado Asociado",
    img: "assets/hyu_NicolasCarterHoltehuer.jpeg",
    description: "Nicolás Carter Holtehuer lidera el área de derecho ambiental y regulatorio de la firma. Su práctica profesional se centra en la asesoría legal preventiva de proyectos de inversión, la representación ante el Sistema de Evaluación de Impacto Ambiental (SEIA) y la tramitación administrativa ante diversos organismos del Estado. Es clave en el aseguramiento del cumplimiento normativo ambiental y la defensa frente a sanciones del ámbito público.",
    specialties: [
      "Derecho Ambiental y Evaluación de Proyectos de Inversión.",
      "Derecho Administrativo, Regulatorio y Litigación Pública.",
      "Auditorías de Cumplimiento Normativo (Compliance Ambiental)."
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Si Lucide falla al cargar desde el CDN (red lenta, bloqueo, versión distinta),
  // esto ya NO detiene el resto del script (menú móvil, scroll, modales, formulario).
  try {
    lucide.createIcons();
  } catch (err) {
    console.error("No se pudieron cargar los íconos Lucide:", err);
  }


  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuIcon = document.getElementById("mobile-menu-icon");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  const toggleMenu = () => {
    const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
    mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
    mobileMenu.setAttribute("aria-hidden", isExpanded);
    mobileMenu.classList.toggle("active");
    if (mobileMenuIcon) {
      mobileMenuIcon.classList.toggle("is-open", !isExpanded);
    }
  };

  const closeMobileMenu = () => {
    if (!mobileMenu.classList.contains("active")) return;
    mobileMenu.classList.remove("active");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    if (mobileMenuIcon) mobileMenuIcon.classList.remove("is-open");
  };

  mobileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Cerrar el menú al tocar fuera de él (comportamiento esperado en móvil)
  document.addEventListener("click", (e) => {
    if (mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });


  const header = document.getElementById("main-header");
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
      backToTopBtn.classList.remove("opacity-0", "pointer-events-none", "translate-y-3");
    } else {
      header.classList.remove("scrolled");
      backToTopBtn.classList.add("opacity-0", "pointer-events-none", "translate-y-3");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  const lawyerModal = document.getElementById("lawyer-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modalImg = document.getElementById("modal-lawyer-img");
  const modalName = document.getElementById("modal-lawyer-name");
  const modalCharge = document.getElementById("modal-lawyer-charge");
  const modalDescription = document.getElementById("modal-lawyer-description");
  const modalSpecialties = document.getElementById("modal-lawyer-specialties");
  const modalContactLink = document.getElementById("modal-contact-link");
  
  let previousActiveElement = null;

  const openModal = (lawyerKey, triggerBtn) => {
    const data = lawyersData[lawyerKey];
    if (!data) return;

    previousActiveElement = triggerBtn;

    modalImg.src = data.img;
    modalImg.alt = "Fotografía profesional de " + data.name;
    modalName.textContent = data.name;
    modalCharge.textContent = data.charge;
    modalDescription.textContent = data.description;

    modalSpecialties.innerHTML = "";
    data.specialties.forEach(spec => {
      const li = document.createElement("li");
      li.className = "flex items-start gap-2.5";
      li.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-[#ff6b00] mt-1.5 shrink-0" aria-hidden="true"></span> <span>${spec}</span>`;
      modalSpecialties.appendChild(li);
    });

    lawyerModal.classList.add("active");
    lawyerModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    

    setTimeout(() => {
      closeModalBtn.focus();
    }, 50);
  };

  const closeModal = () => {
    lawyerModal.classList.remove("active");
    lawyerModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
    if (previousActiveElement) {
      previousActiveElement.focus();
    }
  };

  document.querySelectorAll(".open-modal-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const key = e.currentTarget.getAttribute("data-lawyer");
      openModal(key, e.currentTarget);
    });
  });

  closeModalBtn.addEventListener("click", closeModal);
  modalContactLink.addEventListener("click", closeModal);

  lawyerModal.addEventListener("click", (e) => {
    if (e.target === lawyerModal) closeModal();
  });


  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lawyerModal.classList.contains("active")) closeModal();
      if (confirmationModal.classList.contains("active")) closeConfirmation();
    }
  });


  const contactForm = document.getElementById("legal-contact-form");
  const confirmationModal = document.getElementById("confirmation-modal");
  const closeConfirmationBtn = document.getElementById("close-confirmation-btn");

  const openConfirmation = () => {
    confirmationModal.classList.add("active");
    confirmationModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      closeConfirmationBtn.focus();
    }, 50);
  };

  const closeConfirmation = () => {
    confirmationModal.classList.remove("active");
    confirmationModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
  };


  const inputs = {
    full_name: {
      el: document.getElementById("full_name"),
      err: document.getElementById("error_full_name"),
      validate: (val) => new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{3,50}$").test(val)
    },
    contact_email: {
      el: document.getElementById("contact_email"),
      err: document.getElementById("error_contact_email"),
      validate: (val) => new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$").test(val)
    },
    contact_phone: {
      el: document.getElementById("contact_phone"),
      err: document.getElementById("error_contact_phone"),
      validate: (val) => new RegExp("^\\+?[0-9\\s]{9,15}$").test(val)
    },
    practice_area: {
      el: document.getElementById("practice_area"),
      err: document.getElementById("error_practice_area"),
      validate: (val) => val !== ""
    },
    case_summary: {
      el: document.getElementById("case_summary"),
      err: document.getElementById("error_case_summary"),
      validate: (val) => val.trim().length >= 10
    }
  };

  const checkField = (field) => {
    const value = field.el.value;
    const isValid = field.validate(value);
    if (isValid) {
      field.el.classList.remove("border-red-500");
      field.el.classList.add("border-[#ff6b00]");
      field.err.classList.add("hidden");
    } else {
      field.el.classList.remove("border-[#ff6b00]");
      field.el.classList.add("border-red-500");
      field.err.classList.remove("hidden");
    }
    return isValid;
  };

  Object.keys(inputs).forEach(key => {
    const field = inputs[key];
    field.el.addEventListener("input", () => checkField(field));
    field.el.addEventListener("blur", () => checkField(field));
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let formValid = true;
    Object.keys(inputs).forEach(key => {
      const isValid = checkField(inputs[key]);
      if (!isValid) formValid = false;
    });

    if (formValid) {
      openConfirmation();
      contactForm.reset();
      

      Object.keys(inputs).forEach(key => {
        inputs[key].el.classList.remove("border-[#ff6b00]");
      });
    }
  });

  closeConfirmationBtn.addEventListener("click", closeConfirmation);
  confirmationModal.addEventListener("click", (e) => {
    if (e.target === confirmationModal) closeConfirmation();
  });
});
