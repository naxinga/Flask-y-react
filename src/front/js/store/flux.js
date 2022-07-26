const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			auth:false,
			token:"Bienvenido",
			email:null,
			username:null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],	
		},

		actions: {

			singup : (email, password, username) => {
				fetch(process.env.BACKEND_URL+"/singup", { 
					 method: "POST",
					 headers: { "Content-Type": "application/json" },
					 body: JSON.stringify({ email,  password,  username })
				})
				
				.then (resp=>{
					if (resp.status == 200){
						setStore({email:email})
						setStore({username:username})
					}else{
						alert("Usuario ya existe")
						return "ERROR creando usuario"
					}
					return resp.json()
				})
				.then(data=>{
					localStorage.setItem("jwt-token", data);
					setStore({token: data})
				})
		   
		   },

		   
			login : async (email, password, username) => {
				const resp = await fetch(process.env.BACKEND_URL + "/login", { 
					 method: "POST",
					 headers: { "Content-Type": "application/json" },
					 body: JSON.stringify({ "email": email, "password": password, "username": username })
				})
		   
				if(!resp.ok) throw Error("There was a problem in the login request")
		   
				if(resp.status === 401){
					 throw("Invalid credentials")
				}
				else if(resp.status === 400){
					 throw ("Invalid email or password format")
				}
				const data = await resp.json()
				setStore({email:email, username:username})
				setStore({auth: true})
				localStorage.setItem("jwt-token", username);				
				setStore({token: username})
				return data
		   },

			logout: () => {
				localStorage.removeItem("token")
				setStore({auth: false})
				setStore({email:null, username:null})
			},
			
		}
	};
};

export default getState;
