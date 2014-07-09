function rxWikipedia(component) {
	_this = this;
	
	var comp1 = component;
	
	var input = $('#input'),
			results = $('#results');

	/* Only get the value from each key up */
	var keyups = Rx.Observable.fromEvent(input, 'keyup')
			.map(function (e) {
					return e.target.value;
			})
			.filter(function (text) {
					return text.length > 2;
			});

	/* Now throttle/debounce the input for 500ms */
	var throttled = keyups.throttle(500 /* ms */);

	/* Now get only distinct values, so we eliminate the arrows and other control characters */
	var distinct = throttled.distinctUntilChanged();

	function searchWikipedia (term) {
			return $.ajax({
					url: 'http://en.wikipedia.org/w/api.php',
					dataType: 'jsonp',
					data: {
							action: 'opensearch',
							format: 'json',
							search: term
					}
			}).promise();
	}

	var suggestions = distinct.flatMapLatest(searchWikipedia);

	suggestions.subscribe( function (data) {
			var res = data[1];

			/* Do something with the data like binding */
			_this.comp1.cleanState();

			$.each(res, function (_, value) {
					_this.comp1.append(value);
			});
	}, function (error) {
			/* handle any errors */
			_this.comp1.cleanState();
			_this.comp1.append(error);
	});
}