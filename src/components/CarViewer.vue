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
<div v-if="this.$root.$data.user">
    <form v-on:submit.prevent="addComment(car.id)">
      <input v-model="addedName" placeholder="Name">
      <textarea v-model="addedComment"></textarea>
      <br />
      <button type="submit">Add comment</button>
      <br />
      <br />
    </form>

    <h3 v-if="comments.length">Comments</h3>
    <div v-for="(comment, index) in comments" :key = "index">
      <hr>
      <h5>{{comment.user.username}}</h5>
      <p>{{comment.name}}:  {{comment.description}}</p>
      <button @click = "ShowEdit(car.id)">Edit</button>

      <form v-if = "isEdit && (car.id == editid)" v-on:submit.prevent="EditComment(comment._id)">
        <div class = "nameInput">
          <input v-model="addedName" placeholder="Name">
        </div>

        <textarea v-model="addedComment"></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
      <button @click="removeComment(comment._id)">x</button>
    </div>
  </div>


<button @click="hideCarViewer">Exit</button>
    </div>



  </div>

</template>


<script>
import axios from "axios";
export default {
  name: 'CarViewer',
  data(){
		return{
      addedName: "",
      addedComment:  "",
      //id: 0,
      isEdit: false,
      // editid: 0,
			//car:{},
			comment: {description: ""},
			comments: [],
		}
  },

created() {
this.getComments();
  },
  methods: {
    async getComments(){
    console.log("trying to get comments");
    console.log("car id is " + this.car.id);
    let response = await axios.get('api/comments/' + this.car.id);
    this.comments = response.data;
    console.log(response);
    console.log(this.car.comments);

/*  this got rid of error, but comments were empty.
async getComments(){
console.log("trying to get comments");
console.log("car id is " + this.car.id);

let response = await axios.get( this.$root.$data.products[this.car.id].comments);

this.comments = response.data;
console.log(response);
console.log(this.car.comments);
},
*/


    },
    // async getComments(){
    //     try {
    //       let response = await axios.get("/api/comments/" + this.car.id);
    //       this.comments = response.data.comments;
    //       return true;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   this is end of what v did  },
    hideCarViewer(){
      this.comments = [];
      this.$root.$data.showCarViewer = false;
    },
    async addComment(id) {
      //let index = this.$root.$data.products.findIndex(car=>car.id == id);
        //this.$root.$data.products[index].comments.push({name:this.addedName, text:this.addedComment});
        console.log("trying to save the comment");
        await axios.post('/api/comments/' + id, {
          description: this.addedComment,
          name: this.addedName,
          user: this.$root.$data.user,
        });
        this.addedName = "";
        this.addedComment = "";
        this.getComments();
      },

      async removeComment(id) {
      try {
        await axios.delete("/api/comments/" + id);
        this.getComments();
        return true;
      } catch (error) {
        console.log(error);
      }

        //let carindex = this.$root.$data.products.findIndex(car=>car.id == carid)
        //let commentindex = this.$root.$data.products[carindex].comments.findIndex(car=>car.id == commentid)
        //this.$root.$data.products[carindex].comments.splice(commentindex, 1)
    },
    async EditComment(id){
      try {
        await axios.put('/api/comments/' + id, {
          description: this.addedComment,
          name: this.addedName,
        });
        this.getComments();
        return true;
      } catch (error) {
        console.log(error);
      }
      this.ShowEdit()
    },
    ShowEdit(id){
      this.isEdit = !this.isEdit;
      this.editid = id;
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
