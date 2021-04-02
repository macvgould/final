<template>
<div id="app">
  <div id="menu">
    <div class="special">
      <router-link to="/">
        <h2>Welcome to the Car Browser!</h2>
      </router-link>
    </div>
  </div>
      <h1>Browse Cars Below!</h1>
      <router-link to="/browse">
        <h3>Quick Filter</h3>
      </router-link>
      <div id="special2">

      </div>
  <router-view />
</div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 50px 100px;
  font-family: 'Josefin Sans', sans-serif;
  text-align: center;
}

#menu {
  display: grid;

  grid-template-areas: "brand";
}

#menu a {
  color: #B7E9F7;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

#brand img {
  height: 200px;
}


.menu-item {
  display: flex;
  flex-direction: column;
}


.browse {
  margin-right: 50px;
}

.special {
  grid-area: brand;
  text-align: center;
  background-color: #7AD7F0;
  color: #fff;
  padding: 20px;
  margin: 0px;
  display: flex;
  justify-content: center;
  font-size: 50px;
}

.special2 {
  grid-area: brand;
  text-align: center;
  background-color: #7AD7F0;
  color: #fff;
  padding: 20px;
  margin: 0px;
  display: flex;
  justify-content: center;
  font-size: 30px;
}

.special2 a{
  font-size: 30px;
}
</style>
