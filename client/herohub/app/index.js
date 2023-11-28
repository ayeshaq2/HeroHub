

const tabsElement = document.getElementById('tabs-example')
  const tabelements = [{
    id:'profile',
    triggerEl: document.querySelector('#profile-tab'),
    targetEl: document.querySelector('#profile'),
  },
  {
    id: 'dashboard',
    triggerEl: document.querySelector('#dashboard-tab'),
    targetEl: document.querySelector('#dashboard'),
  },
  {
      id: 'settings',
      triggerEl: document.querySelector('#settings-tab'),
      targetEl: document.querySelector('#settings'),
  },
  {
      id: 'contacts',
      triggerEl: document.querySelector('#contacts-tab'),
      targetEl: document.querySelector('#contacts'),
  },
  ] 

  // options with default values
    const options = {
      defaultTabId: 'settings',
      activeClasses:
          'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500',
      inactiveClasses:
          'text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
      onShow: () => {
          console.log('tab is shown');
      },
    };

    // instance options with default values
    const instanceOptions = {
    id: 'tabs-example',
    override: true
    };

    function toggleTab(tabID){
      tabelements.forEach((tab =>{
        tab.targetEl.classList.add('hidden')
        tab.triggerEl.classList.remove(options.activeClasses);
        tab.triggerEl.classList.add(options.inactiveClasses)
      }))

      const selectedTab = tabelements.find((tab)=>tab.id===tabID)
      if (selectedTab){
        selectedTab.targetEl.classList.remove('hidden');
        selectedTab.triggerEl.classList.remove(options.inactiveClasses)
        selectedTab.triggerEl.classList.add(options.activeClasses);

        if(options.onShow){
          options.onShow();
        
        }
      }
    }

    function initializeTabs(){
      toggleTab(options.defaultTabId)
      tabelements.forEach((tab)=>{
        tab.triggerEl.addEventListener('click',()=>{
          toggleTab(tab.id)
        })
      })
    }
