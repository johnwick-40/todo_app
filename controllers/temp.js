window._wfx_settings = window._wfx_settings || {};
var _wfx_counter=0;
//_wfx_settings.override_local_storage_state_transfer = true;
//sessionStorage.setItem('Whatfix test towers', 'I am test');

console.log("AC loaded");

var _wfx_interval=setInterval(function(){
  //console.log("Inside setInterval"); 
    _wfx_counter++;

    if(_wfx_counter==40)
    {
        clearInterval(_wfx_interval);
    }

    if(localStorage.getItem('whatfix_uu'))
    {
        if(_wfx_settings.user===undefined)
        {
    //        console.log('Found in local Storage but user not set');
            _wfx_settings.user=localStorage.getItem('whatfix_uu');
        }
        else
        {
      //      console.log("Found in local storage and the user was defined");
        }

        clearInterval(_wfx_interval);
    }
    else{

        if(document.querySelector('[id="lblCompName"]'))
        {
        //  console.log("User detected");
          _wfx_settings.user=document.querySelector('[id="lblCompName"]').innerText;
          if(localStorage.getItem('whatfix_uu')===null)
          {
            localStorage.setItem('whatfix_uu',document.querySelector('[id="lblCompName"]').innerText);
          }
          clearInterval(_wfx_interval);
        }   
    }
},200);


if(location.href.indexOf('Main/Search/ShipmentsCopyNote.aspx')!=-1)
  {
    console.log('Tracking, Outside IF');
if(localStorage.getItem('_wfx_tracking_notes')&&localStorage.getItem('_wfx_tracking_notes')!=-1)
  {
    console.log('Tracking, inside IF');
   _wfx_run_position('fe7ed4a0-90e8-11ec-a19b-000d3a1efee9','16','16','js'); 
  }
  }

  // Toggling the variable value to -1 for home-page
  if(location.href.indexOf('Main/MainMenu.aspx')!=-1)
  {
        localStorage.setItem('_wfx_consolidation',-1);   

      // For Tracking Notes : 
      localStorage.setItem('_wfx_tracking_notes',-1);  


  }




_wfx_settings.onMiss=function(event){
  //console.log('On Miss event triggered');
  
 //Closing the flow in the parent tab
  if(location.href.indexOf('Main/Operations/TrackingNotes.aspx')!=-1)
    {
      if(event.flow_id=="fe7ed4a0-90e8-11ec-a19b-000d3a1efee9" && event.step==16)
        {
          console.log('Tracking notes, closing flow');
          _wfx_close_live();
        }
      
    }
  console.log(event.flow_id,'and miss ',event.step);
   if(event.flow_id=="fe7ed4a0-90e8-11ec-a19b-000d3a1efee9" && event.step!=16)
     {
        localStorage.setItem('_wfx_tracking_notes',-1);  
     }
  if(event.flow_id=='e57e81b0-9351-11ec-886e-000d3a578a9c' && event.step==5)
    {
    localStorage.setItem('_wfx_consolidation',-1);
    //  _wfx_close_live();
      var _wfx_consol_inter=setInterval(function(){
        console.log('SetInterval,Whatfix',event.flow_id);
        if(localStorage.getItem('_wfx_consolidation')==-2||localStorage.getItem('_wfx_consolidation')==19)
          {
      //      console.log('Clearing IntervalFlow was closed or completed in the Child Tab');
            _wfx_close_live();
            clearInterval(_wfx_consol_inter);
          }
      },200);
    }
};

_wfx_settings.onBeforeEnd=function(event){
  console.log('On Before end triggered');
  if(event.flow_id=='e57e81b0-9351-11ec-886e-000d3a578a9c')
    {
    localStorage.setItem('_wfx_consolidation',-1);
    }
  
   if(event.flow_id=="fe7ed4a0-90e8-11ec-a19b-000d3a1efee9")
     {
        localStorage.setItem('_wfx_tracking_notes',-1);
     
     }
  
};

_wfx_settings.onClose=function(event){
  console.log('On Close triggered');
  if(event.flow_id=="fe7ed4a0-90e8-11ec-a19b-000d3a1efee9")
     {
             if(location.href.indexOf('Main/Operations/TrackingNotes.aspx')!=-1&&event.step==16)
        {
         localStorage.setItem('_wfx_tracking_notes',16); 
          _wfx_close_live();
        }
       else
         {
           localStorage.setItem('_wfx_tracking_notes',-1);
           
         }
        
     
     }
  if(event.flow_id=='e57e81b0-9351-11ec-886e-000d3a578a9c')
    {
    localStorage.setItem('_wfx_consolidation',-1);
    }
  
  if(event.flow_id=="e57e81b0-9351-11ec-886e-000d3a578a9c" && event.step >= 5)
    {
      localStorage.setItem('_wfx_consolidation',-2);   
    }
};


// Create Consolidation

function _wfx_create_consolidation(){
  //console.log('Event Triggered');
   // console.log('setTimeout, Whatfix',_wfx_is_live());
    if(location.href.indexOf('Main/Search/Shipments.aspx')!=-1 && !_wfx_is_live())
      {
      //  console.log('Inside If, SetTimeout');
        if(document.querySelector('[id="RoutedShipmentFilter"]'))
          {
          //  console.log('Whatfix, element found test');
            _wfx_run("26c286c0-d2e1-11ec-b410-000d3a1efee9");
          }
      }
  }

  _wfx_settings.onBeforeShow=function(event){
   console.log('OnBeforeShow, Flow_id is :',event.flow_id,'and step is : ',event.step,'and status of live is : ',_wfx_is_live());
    if(event.flow_id=="fe7ed4a0-90e8-11ec-a19b-000d3a1efee9")
       {
        localStorage.setItem('_wfx_tracking_notes',event.step);  
       }
    
    if(event.flow_id=="e57e81b0-9351-11ec-886e-000d3a578a9c")
      {
     //   console.log('Variable Set');
        localStorage.setItem('_wfx_consolidation',event.step);
        
      }
    
    if(event.flow_id=='26c286c0-d2e1-11ec-b410-000d3a1efee9')
      {
    //    console.log('Dummy Step completing it via AC');
           return{
           "flow_id": "e57e81b0-9351-11ec-886e-000d3a578a9c",
              "position": 9
       }; 
      }
    
    if(event.flow_id=="10140d00-8aa1-11ec-a5a6-000d3a5780c8" || event.flow_id=="c110f840-941d-11ec-8515-000d3a5780c8" || event.flow_id=="50db1540-9019-11ec-b9be-000d3a578b00" || event.flow_id=="80b3f4a0-9404-11ec-9d3b-000d3a578b00"||event.flow_id=="70558470-94ef-11ec-9128-000d3a5780c8"||event.flow_id=="fe7ed4a0-90e8-11ec-a19b-000d3a1efee9"){
  //console.log('onBeforeShow, state set');
    _wfx_settings.override_local_storage_state_transfer = true;  
     }
  else{
  //  console.log('onBeforeShow, else set');
	 _wfx_settings.override_local_storage_state_transfer = false;  
    }
    
  };

setTimeout(function(){
    if(localStorage.getItem('_wfx_consolidation')&&localStorage.getItem('_wfx_consolidation')>-1)
      {
        _wfx_create_consolidation();
        
      }
  
},4000);


/*
 _wfx_settings.findElements = function(event) {
   console.log('Finding ELement',event.flow_id);
    if(event.flow_id=="e57e81b0-9351-11ec-886e-000d3a578a9c" && localStorage.getItem('_wfx_consolidation') == '-2'){
           console.log('Killling flow...');
           _wfx_close_live();
    }
 };
*/





