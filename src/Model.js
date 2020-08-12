export default function Model({ observable, renderer }) {
	return new Proxy(observable, {
		get(observable, prop) {
			return observable[prop];
		},
		set(observable, prop, value) {
			observable[prop] = value;

			renderer(prop, observable);

			return true;
		},
	});
}
