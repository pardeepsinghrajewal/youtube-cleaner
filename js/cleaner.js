let wcSubscriptionList = [];

let count = 0;

function getSubscriptionList() 
{
  let sl = document.querySelectorAll('#contentContainer #sections .title');
  Array.from(sl).forEach(function (element) {
    if (!wcSubscriptionList.includes(element.textContent)) {
      wcSubscriptionList.push(element.textContent);
    }
  })  
}


function wcFilterContent() {
  getSubscriptionList();
  let records = document.querySelectorAll('#contents.ytd-rich-grid-renderer ytd-rich-item-renderer');
  Array.from(records).forEach(function (record) 
  {
    let cn = record.querySelector('#byline-container .ytd-channel-name a');
    if (typeof cn === 'object' && cn !== null && cn !== 'undefined') 
    {
      if (wcSubscriptionList.includes(cn.textContent)) 
      {
        record.classList.remove('wchide');
        record.style.visibility = 'visible';
      }
      else 
      {        
        record.classList.add('wchide');
        record.style.visibility = 'hidden';
      }
    }
  })
}

function wcMutationObserver()
{
  const targetNode = document.querySelector('body  #content #page-manager #primary  #contents.ytd-rich-grid-renderer'); 
  const config = {  attributes: true, childList: true, subtree: true };
  const callback = function (mutationsList, observer) 
  {
    let found = false;
    for (const mutation of mutationsList) 
    {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) 
      {    
        found = true;
      }
    }
    if(found)
    {
      if(count % 9 === 0)
      {
        wcFilterContent();
      }
      if(count > 1000)
      {
        count = 0;
      }
      count++;
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

function wcFindElement()
{
  let found = false;
  let count = 0;
  let interval = setInterval(() => 
  {  
    if (!found) 
    {
      const element = document.querySelector('body  #content #page-manager #primary  #contents.ytd-rich-grid-renderer');
      if (element) 
      {
        clearInterval(interval);
        found = true;
        setTimeout(function() 
        {
          wcMutationObserver()
        }, 1000);
      }
    }
    if (count > 11) 
    {
      clearInterval(interval);
    }
    count++;
  }, 500);
}
wcFindElement();