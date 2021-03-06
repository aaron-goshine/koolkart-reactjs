var React = require('react');

var Rating = React.createClass({
  propTypes: {
    score: React.PropTypes.number.isRequired
  },
  render() {
    var rating = this.props.score / 5 * 100;
    var mask = {width: rating + "%"};
    return (
      <div className="star">
        <div className="mask-bg">
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
        </div>
        <div className="mask" style={mask}>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
        </div>
      </div>
    );
  }

});

module.exports = Rating;

