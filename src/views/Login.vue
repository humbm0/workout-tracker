<template>
	<main class="login">
		<section class="forms">

			<form class="register" @submit.prevent="register">
				<h2>Register</h2>
                <input 
					type="name" 
					placeholder="Name"
					v-model="registerForm.name" />
				<input 
					type="email" 
					placeholder="Email address"
					v-model="registerForm.email" />
				<input 
					type="password" 
					placeholder="Password" 
					v-model="registerForm.password" />
				<input 
					type="submit" 
					value="Register" />
			</form>

			<form class="login" @submit.prevent="login">
				<h2>Login</h2>
				<input 
					type="email" 
					placeholder="Email address"
					v-model="loginForm.email" />
				<input 
					type="password" 
					placeholder="Password" 
					v-model="loginForm.password" />
				<input 
					type="submit" 
					value="Login" />
			</form>

		</section>
	</main>
</template>

<script>
export default {
	// setup () {
	// 	const login_form = ref({});
	// 	const register_form = ref({});
	// 	const store = useStore();
	// 	const login = () => {
	// 		store.dispatch('login', login_form.value);
	// 	}
	// 	const register = () => {
	// 		store.dispatch('register', register_form.value);
	// 	}
	// 	return {
	// 		login_form,
	// 		register_form,
	// 		login,
	// 		register
	// 	}
	// },
	data() {
		return {
			loginForm: {
				email: '',
				password: ''
			},
			registerForm: {
				name: '',
				title: '',
				email: '',
				password: ''
			}
		}
	},
	methods: {
		login() {
			this.$store.dispatch('login', {
				email: this.loginForm.email,
				password: this.loginForm.password
			})
		},
		register() {
			this.$store.dispatch('register', {
				email: this.registerForm.email,
				password: this.registerForm.password,
				firstName: this.registerForm.name.split(' ').slice(0, -1).join(' '),
				lastName: this.registerForm.name.split(' ').slice(-1).join(' '),

			})
		},
	}
}
</script>

<style lang="scss">
.forms {
	display: flex;
	min-height: 100vh;
}
form {
	flex: 1 1 0%;
	padding: 1rem;
	max-width: 400px;
	margin: auto;
}
input {
	display: block;
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
	font-size: 1rem;
	margin-bottom: 2rem;
	padding: 0.5rem;
}
.radio-buttons{
	text-align: left;
	width: 100%;	
	margin-bottom: 2rem;
	.button{
		display: flex;
		input{
			width: auto;
			max-width: none;
			margin: 0;
			margin-right: 1rem;
		}
	}
}
</style>