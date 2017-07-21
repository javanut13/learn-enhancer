DomReady.ready(() => {
  var thing = document.getElementById("resourceobject");
  if(thing != null) {
    return window.location.replace(thing.data);
  } else {
    let frame = document.getElementById("cleanSlate");
    if (frame != null) {
      return window.location.replace(frame.src);
    }
  }
  
  let date = new Date();
  if (date.getDate() == 1 && date.getMonth() == 3) {
    let rand = Math.random();
    if(rand < 0.15) {
      aprilFools();
    }
  }

  //Delete menu items
  var menu1 = document.getElementsByClassName('block_menu_site_and_course')[0]
  if (menu1 !== undefined) {
    menu1.remove();
  }
  var menu2 = document.getElementsByClassName('block_site_main_menu')[0]
  if (menu2 !== undefined) {
    menu2.remove();
  }
  
  //Delete  courses, identified by title attribute in the <a> node (Use 'Inspect' tool to find this easily)
  chrome.storage.sync.get('ignored_courses', (data) => {
    data.ignored_courses.forEach((title) => {
      let node = document.querySelector('[title="' + title + '"]');
      if (node !== null) {
        node.parentNode.parentNode.remove(); // Delete containing <li>
      }
    });
  });

  // Auto-login 
  chrome.storage.sync.get("autologin", (data) => {
    console.log(data.autologin)
    if (data.autologin === true) {
      let loginbtn = document.getElementsByClassName('ucloginbtn')[0];
      if (loginbtn) {
        loginbtn.click();
      } else {
        let button = document.querySelector('form#login button');
        if (button) window.setTimeout(() => button.click(), 500);
      }
    }
  });
  
  // Lol, James..
  if(document.URL.indexOf("blackboard.vuw.ac.nz/") != -1) {
    var nameLink = document.getElementById("global-nav-link");
    var oldHTML = nameLink.innerHTML;
    nameLink.innerHTML = oldHTML.replace("James Wright", '"Will is Awesome!" - James Wright');
  } else {
    var main = document.getElementById('region-main');
    if (!main) {
      return;
    }
    main.className = "span9 pull-right";
    var side = document.getElementById('block-region-side-pre');
    side.className = "span3 desktop-first-column decaf-border decaf-border-right block-region";
  }
});
