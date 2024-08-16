    var menuLinks = [
        {text: 'about', href: '/about'},
        {text: 'catalog', href: '#', subLinks: [
          {text: 'all', href: '/catalog/all'},
          {text: 'top selling', href: '/catalog/top'},
          {text: 'search', href: '/catalog/search'},
        ]},
        {text: 'orders', href: '#' , subLinks: [
          {text: 'new', href: '/orders/new'},
          {text: 'pending', href: '/orders/pending'},
          {text: 'history', href: '/orders/history'},
        ]},
        {text: 'account', href: '#', subLinks: [
          {text: 'profile', href: '/account/profile'},
          {text: 'sign out', href: '/account/signout'},
        ]},
    ];

    const mainEl = document.querySelector('main');
    mainEl.style.backgroundColor = 'var(--main-bg)';
    mainEl.innerHTML = '<h1> DOM Manipulation </h1>';
    mainEl.classList.add("flex-ctr");

    const topMenuEl = document.getElementById("top-menu");
    topMenuEl.style.height = "100%";
    topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
    topMenuEl.classList.add("flex-around");

    const topMenuLinks = topMenuEl.querySelectorAll('A');

    topMenuEl.addEventListener('click', (Event) => {
      Event.preventDefault();
      if (Event.target.tagName !== 'A') return; //return if clicked element is not an <a>
      
      // Check if the clicked link is already active
      if (Event.target.classList.contains('active')) {
      Event.target.classList.remove('active');  // Remove the active class
      subMenuEl.style.top = '0'; // Hide the sub menu
      subMenuEl.innerHTML = ''; // Clear the sub menu contents
      } else {
      // Remove the active class from all <a> elements
      document.querySelectorAll('#top-menu a').forEach(link => link.classList.remove('active'));
      // Add the active class to the clicked <a> element
      Event.target.classList.add('active');
      // Find the clicked link's corresponding "link" object in menuLinks
      const linkObject = menuLinks.find(link => link.text === event.target.textContent);
      // Check if the "link" object has a subLinks property
      if (linkObject && linkObject.subLinks) {
      subMenuEl.style.top = '100%';  // Show the sub menu
      buildSubmenu(linkObject.subLinks); // Populate sub menu with sub links
      } else {
      subMenuEl.style.top = '0';  // Hide the sub menu
      subMenuEl.innerHTML = ''; // Clear the sub menu contents
      }
    }
      console.log(Event.target.textContent);
    });


    const subMenuEl = document.getElementById("sub-menu");        // Cache the sub-menu
    subMenuEl.style.height = "100%";                             // Set height
    subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';     // Set background color
    subMenuEl.style.position = "absolute";
    subMenuEl.style.top = "0";
    subMenuEl.classList.add("flex-around");

    menuLinks.forEach((link) => {
        const li = document.createElement("a");
        li.setAttribute("href", link.href);
        li.textContent = link.text;
        topMenuEl.appendChild(li);
    });

    function buildSubmenu(subLinks) {
      // Clear the current contents of subMenuEl
      subMenuEl.innerHTML = '';
  
      // Iterate over the subLinks array and create <a> elements
      subLinks.forEach(link => {
          const subLinkEl = document.createElement('a');
          subLinkEl.setAttribute('href', link.href);
          subLinkEl.textContent = link.text;
          subMenuEl.appendChild(subLinkEl);
      });
    }

    subMenuEl.addEventListener('click', (Event) => {
      Event.preventDefault();
      // Return if the clicked element is not an <a> element
      if (Event.target.tagName !== 'A') return;

      const clickedText = Event.target.textContent;

      console.log(Event.target.textContent);

      subMenuEl.style.top = '0'; // Hide the sub menu

      // Remove the active class from each <a> element in topMenuLinks
      topMenuLinks.forEach(link => link.classList.remove('active'));

      if (clickedText === 'about') {
        mainEl.innerHTML = '<h1>About</h1>';
      } else {
        mainEl.innerHTML = `<h1>${clickedText}</h1>`;
      }
    });
  
