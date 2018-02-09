#! /usr/bin/env node
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
const requestBodyBuilder = require('./request_body_builder');


it('should handle start request', function() {
	chai.request('http://localhost:9001')
		.post('/start')
	  	.send({ "game_id": 1 })
		.end(function (err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('name');
			expect(res.body).to.have.property('head_url');
		});
});


it('should return a move', function() {
	var requestBody = requestBodyBuilder.getEmptyRequestBody();
	requestBodyBuilder.addFood(requestBody, 7, 19);
	requestBodyBuilder.addSnake(requestBody, [{"x": 7, "y": 18}, {"x": 6, "y": 18}, {"x": 5, "y": 18}]);
	requestBodyBuilder.addYou(requestBody, [{"x": 11, "y": 11}, {"x": 11, "y": 12}, {"x": 11, "y": 13}]);

	chai.request('http://localhost:9001')
		.post('/move')
	  	.send(requestBody)
		.end(function (err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('move');
		});
});


it('should handle small spaces', function() {
	var requestBody = requestBodyBuilder.getEmptyRequestBody();
	requestBodyBuilder.addFood(requestBody, 7, 19);
	requestBodyBuilder.addSnake(requestBody, [{"x": 10, "y": 18}, {"x": 9, "y": 18}, {"x": 8, "y": 18}, {"x": 7, "y": 18}, {"x": 6, "y": 18}, {"x": 5, "y": 18}, {"x": 4, "y": 18}, {"x": 3, "y": 18}, {"x": 2, "y": 18}, {"x": 1, "y": 18}, {"x": 0, "y": 18}]);
	requestBodyBuilder.addYou(requestBody, [{"x": 11, "y": 19}, {"x": 11, "y": 18}, {"x": 11, "y": 17}]);

	chai.request('http://localhost:9001')
		.post('/move')
	  	.send(requestBody)
		.end(function (err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('move').with.equal('right');
		});
});