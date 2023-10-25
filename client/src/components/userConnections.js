import axios from "axios";

export const acceptRequest = async (id, token) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5050/acceptConnectionRequest/${id}`,
        {},
  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return "ok";
    } catch (error) {
      return error.response.data.message;
    }
  };

  export const addFriend = async (id) => {
    try {
     
console.log("new User id: "+id);
   


    const { data } = await axios.put(
        `http://localhost:5050/api/sendconnectionRequest/${id}`,
        // JSON.parse(localStorage.getItem('_id'))
        { _id: localStorage.getItem('userId') }
      );

      return "ok";
    } catch (error) {
      return error.response.data.message;
    }
  };

  export const cancelRequest = async (id) => {
    try {
      // const { data } = await axios.put(
      //   `http://localhost:5050/cancelconnectionRequest/${id}`,
      //   {},
  
      //   {
      //   //   headers: {
      //   //     Authorization: `Bearer ${token}`,
      //   //   },
      //   }
      // );


    const { data } = await axios.put(
      `http://localhost:5050/api/cancelconnectionRequest/${id}`,
      // JSON.parse(localStorage.getItem('_id'))
      { _id: localStorage.getItem('userId') }
    );

      return "ok";
    } catch (error) {
      return error.response.data.message;
    }
  };

  export const deleteRequest = async (id) => {
    try {
      // const { data } = await axios.put(
      //   `http://localhost:5050/deleteConnectionRequest/${id}`,
      //   {},
  
      //   {
      //   //   headers: {
      //   //     Authorization: `Bearer ${token}`,
      //   //   },
      //   }
      // );

      const { data } = await axios.put(
        `http://localhost:5050/api/deleteConnectionRequest/${id}`,
        // JSON.parse(localStorage.getItem('_id'))
        { _id: localStorage.getItem('userId') }
      );
      return "ok";
    } catch (error) {
      return error.response.data.message;
    }
  };


  export const follow = async (id) => {
    try {
      // const { data } = await axios.put(
      //   `http://localhost:5050/followConnection/${id}`,
      //   {},
  
      //   {
      //   //   headers: {
      //   //     Authorization: `Bearer ${token}`,
      //   //   },
      //   }
      // );

      const { data } = await axios.put(
        `http://localhost:5050/api/followConnection/${id}`,
        { _id: localStorage.getItem('userId') }
      );
      return "ok";
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  };
  export const unfollow = async (id) => {
    try {
      // const { data } = await axios.put(
      //   `http://localhost:5050/unfollowConnection/${id}`,
      //   {},
  
      //   {
      //   //   headers: {
      //   //     Authorization: `Bearer ${token}`,
      //   //   },
      //   }
      // );
      const { data } = await axios.put(
        `http://localhost:5050/api/unfollowConnection/${id}`,
        { _id: localStorage.getItem('userId') }
      );
      return "ok";
    } catch (error) {
      return error.response.data.message;
    }
  };

  export const unfriend = async (id) => {
    try {
      // const { data } = await axios.put(
      //   `http://localhost:5050/withdrawConnectionRequest/${id}`,
      //   {},
  
      //   {
      //   //   headers: {
      //   //     Authorization: `Bearer ${token}`,
      //   //   },
      //   }
      // );
      const { data } = await axios.put(
        `http://localhost:5050/api/withdrawConnectionRequest/${id}`,
        { _id: localStorage.getItem('userId') }
      );
      return "ok";
    } catch (error) {
      return error.response.data.message;
    }
  };