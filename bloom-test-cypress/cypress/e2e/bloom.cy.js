const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "How it works", path: "/journey" },
  { name: "About us", path: "/about" },
  { name: "Contact us", path: "/contact" },
];

describe("Global Navigation", () => {
  beforeEach(() => {
    cy.visit("https://bloom-rho-sand.vercel.app/");
  });

  it("shows the logo and all nav links on the home page", () => {
    cy.get("img[alt='Bloom Brand Logo']").should("be.visible");
    NAV_LINKS.forEach((link) => {
      cy.get("nav, header").contains("a", link.name).should("be.visible");
    });
  });

  NAV_LINKS.forEach((link) => {
    it(`navigates to ${link.name} (${link.path}) and loads without error`, () => {
      cy.get("nav, header").contains("a", link.name).click();
      cy.location("pathname").should("eq", link.path);
      cy.get("body").should("be.visible");
      cy.contains(/404|this page could not be found/i).should("not.exist");
    });
  });

  it("keeps the nav and footer present on every page", () => {
    NAV_LINKS.forEach((link) => {
      cy.visit("https://bloom-rho-sand.vercel.app" + link.path);
      cy.get("nav, header").should("exist");
      cy.contains("SpyHive - Bloom").should("exist");
    });
  });


});

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("https://bloom-rho-sand.vercel.app/");
  });

  it("displays the hero headline and intro copy", () => {
    cy.contains(/from pregnancy to motherhood/i).should("be.visible");
    cy.contains(/instant risk analysis/i).should("be.visible");
  });

  // it("shows both primary CTAs", () => {
  //   cy.contains("a", "Get Started").should("be.visible").and("have.attr", "href");
  //   cy.contains("a", "Get Support").should("be.visible").and("have.attr", "href");
  // });

  it("renders the maternal risk breakdown with percentages", () => {
    cy.contains("Understanding the Risk").should("be.visible");
    ["Postpartum Hemorrhage", "Obstructed Labor", "Eclampsia", "Sepsis"].forEach(
      (label) => {
        cy.contains(label).should("be.visible");
      }
    );
    cy.contains("40.0%").should("be.visible");
  });

  it("shows the three stakeholder cards", () => {
    cy.contains("Mothers").should("be.visible");
    cy.contains("Caregivers").should("be.visible");
    cy.contains("Health Promoters").should("be.visible");
  });

  it("displays the operational standards stats", () => {
    cy.contains("< 10m").should("be.visible");
    cy.contains("CHP Response Speed").should("be.visible");
    cy.contains("100%").should("be.visible");
    cy.contains("80%+").should("be.visible");
  });


});

describe("Services Page", () => {
  beforeEach(() => {
    cy.visit("https://bloom-rho-sand.vercel.app/services");
  });

  it("shows the page heading", () => {
    cy.contains("Our Services").should("be.visible");
  });

  it("lists all three service cards with their descriptions and valid images", () => {
    const services = [
      {
        title: "Daily Symptoms Log and Alerts",
        description: /save their daily symptoms/i
      },
      {
        title: "Daily Tips and Reminders",
        description: /instant warnings sent straight to local health promoters/i
      },
      {
        title: "Caregiver Overview",
        description: /husbands and caregivers see daily health updates/i
      }
    ];

    services.forEach((service) => {
      cy.contains("h3, h4, div", service.title)
        .parent()
        .within(() => {
          cy.contains(service.title).should("be.visible");
          cy.contains(service.description).should("be.visible");
          cy.get("img")
            .should("be.visible")
            .and(($img) => {
              expect($img[0].naturalWidth).to.be.greaterThan(0);
            });
        });
    });
  });

  it("renders at least three supporting images on the page", () => {
    cy.get("img").its("length").should("be.gte", 3);
  });
});

describe("Journey (How It Works) Page", () => {
  beforeEach(() => {
    cy.visit("https://bloom-rho-sand.vercel.app/journey");
  });

  it("shows the page heading and intro", () => {
    cy.contains("Navigate Your Journey With Bloom").should("be.visible");
    cy.contains(/connects mothers, family members, health workers/i).should(
      "be.visible"
    );
  });

  it("lists all five journey steps with their descriptions and valid images", () => {
    const journeySteps = [
      {
        title: "1. Select Daily Symptoms",
        description: /mothers select their daily symptoms using simple text and icons/i
      },
      {
        title: "2. Check Maternal Health Risks",
        description: /app instantly checks the daily symptoms logs/i
      },
      {
        title: "3. Share With Caregiver",
        description: /links to caregiver phones\. husbands and relatives can see daily health updates/i
      },
      {
        title: "4. Alert Community Health Providers",
        description: /sends an emergency notification directly to a local community health promoter/i
      },
      {
        title: "5. Send Data to Hospital",
        description: /community health provider gets a clean PDF document showing the mother's recent history/i
      }
    ];

    journeySteps.forEach((step) => {
      cy.contains("h3, h4, div", step.title)
        .parent()
        .within(() => {
          cy.contains(step.title).should("be.visible");
          cy.contains(step.description).should("be.visible");
          cy.get("img")
            .should("be.visible")
            .and(($img) => {
              expect($img[0].naturalWidth).to.be.greaterThan(0);
            });
        });
    });
  });

  it("renders at least five supporting images for the journey flowchart steps", () => {
    cy.get("img").its("length").should("be.gte", 5);
  });

  const steps = [
    "1. Select Daily Symptoms",
    "2. Check Maternal Health Risks",
    "3. Share With Caregiver",
    "4. Alert Community Health Providers",
    "5. Send Data to Hospital",
  ];

  steps.forEach((step) => {
    it(`shows step: ${step}`, () => {
      cy.contains(step).should("be.visible");
    });
  });

  it("renders all 5 steps in correct top-to-bottom order", () => {
    cy.get("body").then(($body) => {
      const text = $body.text();
      const positions = steps.map((s) => text.indexOf(s));
      positions.forEach((pos, i) => {
        expect(pos, `step "${steps[i]}" should exist`).to.be.greaterThan(-1);
        if (i > 0) {
          expect(pos, `step "${steps[i]}" should appear after "${steps[i - 1]}"`).to.be.greaterThan(
            positions[i - 1]
          );
        }
      });
    });
  });
});

describe("About Page", () => {
  beforeEach(() => {
    cy.visit("https://bloom-rho-sand.vercel.app/about");
  });

  it("loads without a 404 or error page", () => {
    cy.contains(/404|this page could not be found/i).should("not.exist");
    cy.get("body").should("be.visible");
  });

  it("shows the shared nav and footer", () => {
    cy.get("nav, header").should("exist");
    cy.contains("SpyHive - Bloom").should("exist");
  });
});

describe("Contact Page", () => {
  beforeEach(() => {
    cy.visit("https://bloom-rho-sand.vercel.app/contact");
  });

  it("lists all four support cards with their descriptions and valid images", () => {
    const contactCards = [
      {
        title: "General Support",
        description: /get answers to questions and account set up assistance/i
      },
      {
        title: "Clinic Partners",
        description: /connect your healthcare facility directly with our network/i
      },
      {
        title: "Technical Support",
        description: /report any offline sync delays or progressive web app loading errors/i
      },
      {
        title: "Community Promoters",
        description: /get help from local health promoters around you/i
      }
    ];

    contactCards.forEach((card) => {
      cy.contains("h3, h4, div", card.title)
        .parent()
        .within(() => {
          cy.contains(card.title).should("be.visible");
          cy.contains(card.description).should("be.visible");
          cy.get("img")
            .should("be.visible")
            .and(($img) => {
              expect($img[0].naturalWidth).to.be.greaterThan(0);
            });
        });
    });
  });

  it("renders at least four supporting images for the contact categories", () => {
    cy.get("img").its("length").should("be.gte", 4);
  });

  it("shows the four support category cards", () => {
    ["General Support", "Clinic Partners", "Technical Support", "Community Promoters"].forEach(
      (label) => {
        cy.contains(label).should("be.visible");
      }
    );
  });

  it("shows the Get In Touch form heading and intro", () => {
    cy.contains("Get In Touch").should("be.visible");
    cy.contains(/send our product support team a message/i).should("be.visible");
  });

  it("renders the Full Name, Email, and Message fields plus Send button", () => {
    cy.get("input, textarea").should("have.length.at.least", 3);
    cy.contains("button", /send message/i).should("be.visible");
  });

  it("allows typing into all form fields", () => {
    cy.get("input[type='text'], input:not([type])").first().type("Tabitha walulu").should(
      "have.value",
      "Tabitha walulu"
    );
    cy.get("input[type='email']").then(($el) => {
      if ($el.length) {
        cy.wrap($el).first().type("Tabitha@gmail.com").should("have.value", "Tabitha@gmail.com");
      }
    });
    cy.get("textarea").first().type("Testing the contact form.").should(
      "have.value",
      "Testing the contact form."
    );
  });

  it("does not submit with empty required fields (basic HTML5 validation)", () => {
    cy.contains("button", /send message/i).click();
    cy.location("pathname").should("eq", "/contact");
    cy.get("input[type='text'], input:not([type])").first().then(($el) => {
      const el = $el[0];
      expect(el.validity.valueMissing).to.be.true;
      expect(el.validationMessage).to.match(/please fill out this field/i);
    });
  });

  it("validates incorrect email formats", () => {
    cy.get("input[type='text'], input:not([type])").first().type("Tabitha walulu");
    cy.get("input[type='email']").first().type("invalid-email-format");
    cy.get("textarea").first().type("Testing invalid email validation.");
    cy.contains("button", /send message/i).click();
    cy.get("input[type='email']").first().then(($el) => {
      const el = $el[0];
      expect(el.validity.typeMismatch).to.be.true;
      expect(el.validationMessage).to.include("@");
    });
  });

  it("submits successfully with valid data", () => {
    cy.get("input[type='text'], input:not([type])").first().clear().type("Tabitha walulu");
    cy.get("input[type='email']").first().clear().type("Tabitha@gmail.com");
    cy.get("textarea").first().clear().type("This is a test message from Cypress.");
    cy.contains("button", /send message/i).click();
    cy.contains(/thank you|message sent|success/i, { timeout: 8000 }).should("exist");
  });

  it("displays clinic and support contact info in the footer", () => {
    cy.contains("spyhive@bloom.com").should("be.visible");
    cy.contains("+254 700 121 999").should("be.visible");
  });
});

describe("Footer", () => {
  beforeEach(() => {
    cy.visit("https://bloom-rho-sand.vercel.app/");
  });

  it("shows contact details", () => {
    cy.contains("spyhive@bloom.com").should("be.visible");
    cy.contains("+254 700 121 999").should("be.visible");
  });

  it("renders all social icons as clickable links", () => {
    ["WhatsApp", "Instagram", "LinkedIn", "Facebook"].forEach((platform) => {
      cy.get(`img[alt='${platform}']`)
        .closest("a")
        .should("have.attr", "href")
        .and("not.be.empty");
    });
  });
});