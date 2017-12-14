import React from 'react';
import classNames from 'classnames/bind';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Box.css';
import PropTypes from 'prop-types';
import Scorer from '../Scorer';
// import cx from 'classnames';
// let cx = classNames.bind(s);

class Box extends React.Component {
  static propTypes = {
  };

	componentDidMount() {
		const boxDomNodes = [];
		if (this.boxDiv) {
			this.props.storeDomNodes(this.boxDiv, this.props.timelineIndex);
    }
	}

  render() {
		const { beat, index, scoreBeat, onPlayClick, id } = this.props;
    return (
			<div className={s.root}>
				<div className={s.box} id={id} ref={(ref) => { this.boxDiv = ref; }}>
					<div className={s.playContainer}>
						<div className={s.playButton} onClick={() => onPlayClick(index)} role="button" tabIndex={index} />
					</div>
					<Scorer {...this.props} />
				</div>
			</div>
    );
  }
}

// <div className={s.textContainer}>
// 	<p>K: {beat.kick}</p>
// 	<p>C: {beat.closedhat}</p>
// 	<p>O: {beat.openhat}</p>
// 	<p>S: {beat.clap}</p>
// </div>

export default withStyles(s)(Box);
