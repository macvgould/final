<template>
  <div class = "first">
    <div class = "second">
    <h1>{{car.make}}</h1>
    <h2>{{car.model}}</h2>

    <div class="image">
      <img :src="'/images/products/'+car.image">
    </div>
    <p>{{car.status}}</p>
    <p>{{car.color}}</p>
    <div class="price">
      <h2>{{car.price}}</h2>
    </div>

    <form v-on:submit.prevent="addComment(car.id)">
      <input v-model="addedName" placeholder="Name">
      <textarea v-model="addedComment"></textarea>
      <br />
      <button type="submit">Add comment</button>
    </form>


    <h3>Comments</h3>
    <div v-for="comment in car.comments" :key = "comment.text">
      <hr>
      <p>{{comment.name}}:  {{comment.text}}</p>
      <button @click = "RemoveComment(car.id, comment.id)">x</button>
      <form v-if = "isEdit && (car.id == editid)" v-on:submit.prevent="EditComment(car.id, comment.id)">
        <div class = "nameInput">
          <input v-model="addedName" placeholder="Name">
        </div>

        <textarea v-model="addedComment"></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
      <button @click = "ShowEdit(car.id)">Edit</button>
    </div>






    <button @click = "hideCarViewer">Exit</button>
  </div>
  </div>
</template>


<script>
export default {
  name: 'CarViewer',
  methods: {
    hideCarViewer(){
      this.$root.$data.showCarViewer = false;
    },
    addComment(id) {
      let index = this.$root.$data.products.findIndex(car=>car.id == id)
        this.$root.$data.products[index].comments.push({name:this.addedName, text:this.addedComment, id:this.id})
        this.addedName = "";
        this.addedComment = "";
        this.id++;
      },
    RemoveComment(carid, commentid){
        let carindex = this.$root.$data.products.findIndex(car=>car.id == carid)
        let commentindex = this.$root.$data.products[carindex].comments.findIndex(car=>car.id == commentid)
        this.$root.$data.products[carindex].comments.splice(commentindex, 1)
    },
    EditComment(carid, commentid){
      let carindex = this.$root.$data.products.findIndex(car=>car.id == carid)
      let commentindex = this.$root.$data.products[carindex].comments.findIndex(car=>car.id == commentid)
      this.$root.$data.products[carindex].comments[commentindex].text = this.addedComment;
      this.$root.$data.products[carindex].comments[commentindex].name = this.addedName;
      this.ShowEdit()
    },
    ShowEdit(id){
      this.isEdit = !this.isEdit;
      this.editid = id;
    }

  },
  data() {
    return{
      addedName: "",
      addedComment:  "",
      id: 0,
      isEdit: false,
      editid: 0,
    }
  },
  computed: {
      car(){
        return this.$root.$data.currentCar;
      }
  }
}
</script>

<style>
  .first{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    z-index: 1;
    background-color: white;
  }
  .price {
    display: flex;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .second{
    overflow: scroll;
    position: relative;
    height: 100%;
  }
  .nameInput{
  }
</style>
