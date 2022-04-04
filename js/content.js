let wcSubscriptionList = ['Anuj Bhaiya','Guru Baani','Online Web Tutor Academy','Code Step By Step','Technical Suneja','Akshay Saini','Kripesh Adwani','5 Minutes Engineering','Navi Digital Point','Imran Sayed - Codeytek Academy','Online Web Tutor','Anuj Bhaiya','CodeWithHarry','Giani sukhchain Singh, jatha bhindran','GUrSeWaK SiNgH Uk','Sk Web Studio','Logos By Nick','freeCodeCamp.org','Andrew from EcomExperts','HISTORY TV18','Bhupinder Singh Mehmad Pur','Mahakaal Studios','Bhai Dharam Singh Khalsa','Cloudstock','Yahoo Baba','Birdy Official','Asset Yogi','Nihung Santhia','Gurmat Tv -Giani Thakur Singh Ji Katha Official','GurbaniSewa','WPCrafter.com WordPress For Non-Techies','Khalsa Sangat','Cyber Baba','Technical Guftgu','Shri Sarbloh Bunga Nangali','Elegant Themes','Aad Sri Guru Granth Sahib Ji','Sarab Sanjhi Gurbani','JagowaleTV','karmjit','ਪਵਣਦੀਪ ਸਿੰਘ','SARABLOH CHANNEL'];



function getSubscriptionList()
{
  //console.clear();
  console.log('* getSubscriptionList *');

  let sl = document.querySelectorAll('#contentContainer #sections .title');
  
  Array.from(sl).forEach(function(element)
  {
    if(!wcSubscriptionList.includes(element.textContent))
    {
      wcSubscriptionList.push(element.textContent);
    }
  })
  console.log('* wcSubscriptionList *');
  console.log(wcSubscriptionList);

}




const wcFilterContent = 
{

  init: function() 
  { 
    //console.log('* wcFilterContent *');  
    
    setTimeout(function() 
    {
      getSubscriptionList();  

      let records = document.querySelectorAll('#contents.ytd-rich-grid-renderer .ytd-rich-grid-row .ytd-rich-grid-row');

      Array.from(records).forEach(function(record)
      {
        let cn = record.querySelector('#byline-container .ytd-channel-name a');

        if(typeof cn === 'object' && cn !== null && cn !== 'undefined')
        {
          if(wcSubscriptionList.length > 0)
          {
            if(!wcSubscriptionList.includes(cn.textContent))
            {
              //console.log(cn.textContent);
              //record.style.visibility = 'hidden';

              record.classList.add('wchide');
              record.style.visibility = 'hidden';
              //record.style.display = 'none';
            }
            else
            {
              record.classList.remove('wchide');
              record.style.visibility = 'visible';
              //record.style.display = 'block';
            }
          }
          
        }
      })
    }, 500);

    
  },
  call: function() 
  { 
    this.init();
  }
}


const wcMutationObserver = 
{
  init: function() 
  { 
    // Select the node that will be observed for mutations
    const targetNode = document.getElementById('content');

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) 
    {
      // Use traditional 'for loops' for IE 11
      for(const mutation of mutationsList) 
      {
        if (mutation.type === 'childList') 
        {
          if(mutation.target.id == 'contents')
          {
            //console.log('** Test **');
            wcFilterContent.init();
          }
        }
        else if (mutation.type === 'attributes') 
        {
          //console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Later, you can stop observing
    //observer.disconnect();

  },
  call: function() 
  { 
    this.init();
  }
}

wcMutationObserver.call();


