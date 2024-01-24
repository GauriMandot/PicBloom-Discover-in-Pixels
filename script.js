const searchedField=document.getElementById('search-field');
const formElement=document.querySelector('form');
const searchResults=document.getElementById('search-results');
const showMoreButton=document.getElementById('show-more-button');
const lightMode=document.getElementById('light_mode');
const darkMode=document.getElementById('dark_mode');
const wrapper=document.getElementById('wrapper');
const api='NWCU8Ji6I3ZI_SEMXN4x3KaY-slLukc92cQzlcUfkSU';

let input="";
let page=1;
let lightTheme=true;


formElement.addEventListener('submit',(e)=>{
   e.preventDefault();
   page=1;
   searchFunction();
});

async function searchFunction(){
   
     input=searchedField.value;
     
     if(input!=""){

        try{
            let response=await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=${api}`);

            let value=await response.json();
            //console.log(value);
            let ans=value.results;

            if(page==1){
                searchResults.innerText="";
            }

           // console.log(ans);

            ans.forEach(function(res){
                let newDiv=document.createElement('div');//div
                newDiv.classList.add('search-result');

                let image=document.createElement('img');//img
                let anchor=document.createElement('a');//a

                image.src=res.urls.small;
                image.alt=res.alt_description;
                image.loading="lazy";
                anchor.href=res.links.html;
                anchor.target="_blank";
                anchor.innerText=res.alt_description;
             
                if(lightTheme){
                    anchor.style.color='#333';
                }
        
                else{
                    anchor.style.color='rgb(217,217,217)';
                }

                newDiv.appendChild(image);
                newDiv.appendChild(anchor);
                searchResults.appendChild(newDiv);

            });

            page++;
            showMoreButton.style.display='block';
        }
          
       catch{
            document.write('Unable to fetch');//will see later
       }

     }
}

showMoreButton.addEventListener('click',searchFunction);

darkMode.addEventListener('click',()=>{
    darkMode.style.display='none';
    lightMode.style.display='block';
    wrapper.style.backgroundColor='rgb(25, 25, 25)';
    wrapper.style.color='white';
    lightTheme=false;
    changeColorofAnchorTag();
   
})

lightMode.addEventListener('click',()=>{
    lightMode.style.display='none';
    darkMode.style.display='block';
    wrapper.style.backgroundColor='white';
    wrapper.style.color='black';
    lightTheme=true;
    changeColorofAnchorTag();
    
})

function changeColorofAnchorTag(){
 
    let child=searchResults.children;
    //console.log(child);

    for (let value of child) {
        //console.log(value.);
        //console.log(value.lastElementChild);
        if(lightTheme){
            value.lastElementChild.style.color='#333';
        }

        else{
            value.lastElementChild.style.color='rgb(217,217,217)';
        }
       
      }
}





