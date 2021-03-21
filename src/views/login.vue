<template>
	<section class="login">
		<p>{{ msg }}</p>
		<div v-if="loggedinUser">
			<h3>
				Loggedin User:
				{{ loggedinUser.username }}
				<router-link :to="'/user/' + loggedinUser._id">User details</router-link>
				<button @click="doLogout">Logout</button>
			</h3>
		</div>
		<div v-else>
			<h2>Login</h2>
			<form @submit.prevent="doLogin">
				<input
					type="text"
					v-model="loginCred.username"
					placeholder="User name"
				/>
				<input
					type="text"
					v-model="loginCred.password"
					placeholder="Password"
				/>
				<button>Login</button>
			</form>

			<form @submit.prevent="doSignup">
				<h2>Signup</h2>
				<input
					type="text"
					v-model="signupCred.fullname"
					placeholder="Your full name"
				/>
				<input
					type="text"
					v-model="signupCred.password"
					placeholder="Password"
				/>
				<input
					type="text"
					v-model="signupCred.username"
					placeholder="Username"
				/>
				<button>Signup</button>
			</form>
		</div>
		<hr />
		<details v-if="loggedinUser && loggedinUser.isAdmin">
			<summary>Admin Section</summary>
			<ul>
				<li v-for="user in users" :key="user._id">
					<pre>{{ user }}</pre>
					<button @click="removeUser(user._id)">x</button>
				</li>
			</ul>
		</details>
	</section>
</template>

<script>
export default {
	name: 'login',
	data() {
		return {
			msg: '',
			loginCred: { username: 'puki', password: '1234' },
			signupCred: { username: '', password: '', fullname: '' },
		};
	},
	computed: {
		users() {
			return this.$store.getters.users;
		},
		loggedinUser() {
			return this.$store.getters.loggedInUser;
		},
	},
	created() {
		this.loadUsers();
	},
	methods: {
		async doLogin() {
			if (!this.loginCred.username) {
				this.msg = 'Please enter username/password';
				return;
			}
			try {
				await this.$store.dispatch({ type: 'login', userCred: this.loginCred });
				this.$router.push('/board');
			} catch (err) {
				console.log(err);
				this.msg = 'Failed to login';
			}
		},
		doLogout() {
			this.$store.dispatch({ type: 'logout' });
		},
		async doSignup() {
			if (
				!this.signupCred.fullname ||
				!this.signupCred.password ||
				!this.signupCred.username
			) {
				this.msg = 'Please fill up the form';
				return;
			}
			await this.$store.dispatch({ type: 'signup', userCred: this.signupCred });
			this.$router.push('/board');
		},
		loadUsers() {
			this.$store.dispatch({ type: 'loadUsers' });
		},
		async removeUser(userId) {
			try {
				await this.$store.dispatch({ type: 'removeUser', userId });
				this.msg = 'User removed';
			} catch (err) {
				this.msg = 'Failed to remove user';
			}
		},
	},
};
</script>
