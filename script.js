const inputBox=document.getElementById('search-input');
const searchBtn=document.getElementById('search-button');
const pokemonCard=document.getElementById('pokemon-card');
const pokemonName=document.getElementById('pokemon-name');
const pokemonId=document.getElementById('pokemon-id');
const weight=document.getElementById('weight');
const height=document.getElementById('height');
const types=document.getElementById('types');
const hp=document.getElementById('hp');
const attack=document.getElementById('attack');
const defense=document.getElementById('defense');
const specialAttack=document.getElementById('special-attack');
const specialDefense=document.getElementById('special-defense');
const speed=document.getElementById('speed');

let pokemonDataArr=[];

fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon')
.then(res => res.json())
.then(data => {
  pokemonDataArr=data.results;
})
.catch(err=>console.error(err));

// functions
const capitalizeFirstLetterOfEachWord = (str) => {
  return str.split('-').map(word => word[0].toUpperCase()+word.slice(1).toLowerCase()).join(' ');
};

const catchPokemons = (input) => {
  fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input}`)
  .then(res => res.json())
  .then(data => {
    pokemonName.textContent=capitalizeFirstLetterOfEachWord(data.name);
    pokemonId.textContent=`#${data.id}`;
    weight.textContent=`Weight: ${data.weight}`;
    height.textContent=`Height: ${data.height}`;
    hp.textContent=data.stats[0].base_stat;
    attack.textContent=data.stats[1].base_stat;
    defense.textContent=data.stats[2].base_stat;
    specialAttack.textContent=data.stats[3].base_stat;
    specialDefense.textContent=data.stats[4].base_stat;
    speed.textContent=data.stats[5].base_stat;
    
    const img=document.getElementById('sprite');
    const leftBtn=document.getElementById('left-button');
    const rightBtn=document.getElementById('right-button');
    
    leftBtn.style.display='block';
    rightBtn.style.display='block';
    img.src=data.sprites.front_default;

    const spritesArray=Object.values(data.sprites);
    let currentIndex=-1; 
    
    const handleRightBtn = () => {
      currentIndex = (currentIndex + 1) % spritesArray.length;
      img.src=spritesArray[currentIndex];
    };

    const handleLeftBtn = () => {
      currentIndex = (currentIndex - 1 + spritesArray.length) % spritesArray.length;
      img.src = spritesArray[currentIndex];
    };

    rightBtn.replaceWith(rightBtn.cloneNode(true)); // make a copy of the button without any listeners
    const newRightBtn=document.getElementById('right-button'); // replace the old button with this new copy
    newRightBtn.addEventListener('click',handleRightBtn); // add the listener to this new button

    leftBtn.replaceWith(leftBtn.cloneNode(true));
    const newLeftBtn=document.getElementById('left-button');
    newLeftBtn.addEventListener('click',handleLeftBtn);

    // add div element for every type
    types.innerHTML='';
    data.types.forEach(obj=>{
      const typeDiv=document.createElement('div');
      typeDiv.setAttribute('class',`${obj.type.name}-type element-container`);
      typeDiv.textContent=obj.type.name.toUpperCase();
      types.appendChild(typeDiv);
      });
  })
  .catch(err=>console.error(err));
};

// event listeners
searchBtn.addEventListener('click',()=>{
  const inputValue=inputBox.value.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g,'-');
  const isValidPokemon = pokemonDataArr.some(obj=>obj.id==inputValue || obj.name===inputValue);
  if(isValidPokemon){
    catchPokemons(inputValue);
  }
  else{
    alert('Pokémon not found');
  }
});
