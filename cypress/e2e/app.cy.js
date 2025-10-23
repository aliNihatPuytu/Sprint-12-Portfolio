describe('App – 23 parçalı stabil E2E', () => {
  const go = (path = '/') =>
    cy.visit(path, { retryOnStatusCodeFailure: true, retryOnNetworkFailure: true });

  beforeEach(() => {
    cy.viewport(1280, 800); 
  });

  // 1
  it('Home açılır; navbar, brand ve hero öğeleri görünür', () => {
    go('/');
    cy.contains('nav', 'Home', { timeout: 15000 }).should('be.visible');
    cy.contains('nav', 'Projects').should('be.visible');
    cy.contains('nav', 'Contact').should('be.visible');
    cy.contains(/ali nihat/i).should('be.visible');
    cy.get('h1', { timeout: 15000 }).should('exist');
    cy.contains('a', 'Github').should('have.attr', 'href');
    cy.contains('a', 'LinkedIn').should('have.attr', 'href');
  });

  // 2
  it('Dil değiştirilebilir ve geri alınabilir', () => {
    go('/');
    cy.get('nav button')
      .contains(/SWITCH TO ENGLISH|TÜRKÇE'YE GEÇ/i, { timeout: 15000 })
      .then(($btn) => {
        const before = ($btn.text() || '').trim();
        const afterRe = before.includes('SWITCH') ? /TÜRKÇE'YE GEÇ/i : /SWITCH TO ENGLISH/i;
        cy.wrap($btn).click();
        cy.get('nav button', { timeout: 15000 }).contains(afterRe).should('be.visible');
        cy.get('nav button').contains(afterRe).click();
        cy.get('nav button').contains(new RegExp(before, 'i')).should('be.visible');
      });
  });

  // 3
  it('Tema toggleda html.dark sınıfı değişir (aç/kapat)', () => {
    go('/');
    cy.get('html').then(($html) => {
      const initiallyDark = $html.hasClass('dark');
      cy.get('button[aria-label="Toggle dark mode"]', { timeout: 15000 }).click({ force: true });
      cy.get('html').should(initiallyDark ? 'not.have.class' : 'have.class', 'dark');
      cy.get('button[aria-label="Toggle dark mode"]').click({ force: true });
      cy.get('html').should(initiallyDark ? 'have.class' : 'not.have.class', 'dark');
    });
  });

  // 4
  it('Projects sayfasına gidilir ve içerik yüklenir', () => {
    go('/');
    cy.contains('nav a', 'Projects').click();
    cy.location('pathname', { timeout: 15000 }).should('eq', '/projects');
    cy.get('img', { timeout: 15000 }).should(($imgs) => {
      expect($imgs.length).to.be.greaterThan(0);
    });
  });

  // 5  
  it('Contact: görünür form alanları + mailto + sosyal linkler mevcut', () => {
    go('/contact');

    cy.get('form').within(() => {
      cy.get('input:visible')
        .not('[type="hidden"]')
        .not('[type="email"]')
        .not('[name="company"]')
        .then(($visInputs) => {
          if ($visInputs.length) {
            cy.wrap($visInputs.first()).should('be.enabled');
          }
        });

      cy.get('input[type="email"]:visible').should('have.length.at.least', 1);
      cy.get('textarea:visible').should('have.length.at.least', 1);
    });
    cy.get('a[href^="mailto:"]:visible').should('exist');
    cy.get('a[aria-label]:visible').its('length').should('be.greaterThan', 0);
  });

  // 6
  it('Home > Profile bölümü ve bilgi satırları görünür', () => {
    go('/');
    cy.contains(/Profil|Profile/i, { timeout: 15000 }).should('be.visible');
    cy.get('dt', { timeout: 15000 }).should(($dts) => {
      expect($dts.length).to.be.greaterThan(2);
    });
  });

  // 7
  it('Navbar linkleri ile ileri-geri gezinme çalışır', () => {
    go('/');
    cy.contains('nav a', 'Projects').click();
    cy.location('pathname').should('eq', '/projects');
    cy.contains('nav a', 'Contact').click();
    cy.location('pathname').should('eq', '/contact');
    cy.contains('nav a', 'Home').click();
    cy.location('pathname').should('eq', '/');
  });

  // 8
  it('Hero görseli görünür ve dış linkler target=_blank', () => {
    go('/');
    cy.get('img[alt="profile"]').should('be.visible');
    cy.contains('a', 'Github').should('have.attr', 'target', '_blank');
    cy.contains('a', 'LinkedIn').should('have.attr', 'target', '_blank');
  });

  // 9
  it('Contact sayfasında sosyal linklerin href’i var', () => {
    go('/contact');
    cy.get('a[aria-label]:visible').each(($a) => {
      expect($a.attr('href'), 'social href').to.match(/^https?:\/\//);
    });
  });

  // 10
  it('Navbar logosu (ali nihat) tıklanınca Home’a döner', () => {
    go('/projects');
    cy.contains(/^ali nihat$/i).click();
    cy.location('pathname', { timeout: 15000 }).should('eq', '/');
  });

  // 11
  it('Mobil görünümde navbar öğeleri erişilebilir', () => {
    cy.viewport(375, 700);
    go('/');
    cy.get('nav').should('be.visible');
    cy.get('button[aria-label="Toggle dark mode"]').should('be.visible');
    cy.get('nav button').contains(/SWITCH TO ENGLISH|TÜRKÇE'YE GEÇ/i).should('be.visible');
    cy.contains('nav a', 'Projects').click();
    cy.location('pathname').should('eq', '/projects');
  });

  // 12
  it('Home hero alanında linear-gradient arka plan stili var', () => {
    go('/');
    cy.get('.h-hero-671', { timeout: 15000 })
      .should('have.attr', 'style')
      .and('include', 'linear-gradient');
  });

  // 13
  it('Home: Skills bölümü görünür', () => {
    go('/');
    cy.get('.minh-skills-610').should('be.visible');
  });

  // 14
  it('Home: Profile bölümü görünür', () => {
    go('/');
    cy.get('.minh-profile-552').should('be.visible');
  });

  // 15
  it('Home: Projects bölümü görünür', () => {
    go('/');
    cy.get('.minh-projects-1039').should('be.visible');
  });

  // 16
  it('Home: Contact bölümü görünür', () => {
    go('/');
    cy.get('.minh-contact-454').should('be.visible');
  });

  // 17
  it('Dil değişikliği sayfalar arasında korunur', () => {
    go('/');
    cy.get('nav button')
      .contains(/SWITCH TO ENGLISH|TÜRKÇE'YE GEÇ/i, { timeout: 15000 })
      .then(($btn) => {
        const before = ($btn.text() || '').trim();
        const afterRe = before.includes('SWITCH') ? /TÜRKÇE'YE GEÇ/i : /SWITCH TO ENGLISH/i;
        cy.wrap($btn).click();
        cy.contains('nav a', 'Projects').click();
        cy.get('nav button').contains(afterRe).should('be.visible');
      });
  });

  // 18
  it('Tema toggleda dark sınıfı diğer sayfaya geçince de korunur', () => {
    go('/');
    cy.get('button[aria-label="Toggle dark mode"]').click({ force: true });
    cy.contains('nav a', 'Contact').click();
    cy.get('html').should('have.class', 'dark');
  });

  // 19
  it('Profile bölümündeki görsel (workspace) görünür', () => {
    go('/');
    cy.get('img[alt="workspace"]', { timeout: 15000 }).should('be.visible');
  });

  // 20
  it('Hero’daki dış linkler rel="noopener" içerir', () => {
    go('/');
    cy.contains('a', 'Github')
      .should('have.attr', 'rel')
      .and((rel) => expect(rel).to.contain('noopener'));
    cy.contains('a', 'LinkedIn')
      .should('have.attr', 'rel')
      .and((rel) => expect(rel).to.contain('noopener'));
  });

  // 21
  it('Sayfa başlığı doğru: "Ali Nihat" ifadesini içerir', () => {
    go('/');
    cy.title().should('include', 'Ali Nihat');
  });

  // 22
  it('Head içinde viewport metası mevcut ve doğru yapılandırılmış', () => {
    go('/');
    cy.get('meta[name="viewport"]')
      .should('have.attr', 'content')
      .and('include', 'width=device-width');
  });

  // 23
  it('Hero CTA linklerinin hrefleri http(s) ile başlar ve rel="noreferrer" içerir', () => {
    go('/');
    cy.contains('a', 'Github')
      .should('have.attr', 'href')
      .and((href) => expect(href).to.match(/^https?:\/\//));
    cy.contains('a', 'LinkedIn')
      .should('have.attr', 'href')
      .and((href) => expect(href).to.match(/^https?:\/\//));

    cy.contains('a', 'Github')
      .should('have.attr', 'rel')
      .and((rel) => expect(rel).to.contain('noreferrer'));
    cy.contains('a', 'LinkedIn')
      .should('have.attr', 'rel')
      .and((rel) => expect(rel).to.contain('noreferrer'));
  });
});
