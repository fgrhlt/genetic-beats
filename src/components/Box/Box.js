import React from 'react';
import classNames from 'classnames/bind';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Box.css';
import PropTypes from 'prop-types';
import Scorer from '../Scorer';
import { getNoOfInstruments, getInstrumentKeys } from '../../utils/utils';

const cx = classNames.bind(s);

class Box extends React.Component {
  static propTypes = {
  };

	componentWillMount() {
		this.setState({
      infoVisible: false,
			allInfoVisible: false,
     });
	}
	/* If we have a reference to this box, put this box in the parents dom node list */
	componentDidMount() {
		const boxDomNodes = [];
		if (this.boxDiv) {
			this.props.storeDomNodes(this.boxDiv, this.props.timelineIndex);
    }
    this.props.onRef(this);
	}
	/* Unreference */
  componentWillUnmount() {
    this.props.onRef(undefined);
	}
	
	/* Toggle if the info should be visible or not */
	onClickInfo() {
		const infoVisible = this.state.infoVisible;
		this.setState({ infoVisible: !infoVisible });
	}

	/* Shows the info of this box */	
  showInfo() {
		this.setState({ infoVisible: true });
	}

	/* Hides the info of this box */
  hideInfo() {
		this.setState({ infoVisible: false });
	}

	/* Populate the beat ticks shown in the info of this box */
	populateBeatTicks() {
		const noOfInstruments = getNoOfInstruments(this.props.beat);
		const instrumentKeys = getInstrumentKeys(this.props.beat);
		const beatTicks = [];

		for (let i = 0; i < noOfInstruments; i++) {
			beatTicks.push(<div className={s.instrumentText} key={'instrument' + i}>{instrumentKeys[i].toUpperCase()}</div>);

			for (let j = 0; j < this.props.beat.kick.length; j++) {
				const filled = this.props.beat[instrumentKeys[i]][j] === 1;
				const tickClass = cx('beatTick', { filled });

				if (j % 4 === 0 && j !== 0) beatTicks.push(<div key={'divider' + i + '' + j}className={s.divider} />);
				beatTicks.push(<div key={'beatTick' + i + '' + j} className={tickClass} />);
			}
		}

		return beatTicks;
	}

  render() {
		const { beat, index, scoreBeat, onPlayClick, timelineIndex } = this.props;
    const colors = ['#5C429B', '#81DFEF', '#1D2DBF', '#6D0F3A', '#FFFFFF', '#8FDD76', '#F286B1', '#EDDA54'];
		const infoOverlayClass = cx('infoOverlay', { active: this.state.infoVisible });
		const colorLineClass = cx('colorLine', { hidden: timelineIndex === 0 });
		const colorLineTooltipClass = cx('colorLineTooltip', { darkText: index === 4 });
    const heartClass = cx('heart', { 'filled-heart': beat.liked });

    return (
			<div className={s.root}>
				<div className={s.box} id={beat.id} ref={(ref) => { this.boxDiv = ref; }}>

					<div className={infoOverlayClass}>
						<div className={s.beatTicks}>
							{ this.populateBeatTicks() }
						</div>
					</div>

					<div className={s.playContainer}>
						<div className={s.playButton} onClick={() => onPlayClick(index)} role="button" tabIndex={index} />
					</div>

          <div className={colorLineClass} style={{ background: colors[index] }} onMouseOver={() => this.props.showLineInfoAction()} />
          
					<div className={colorLineTooltipClass} style={{ background: colors[index] }}>
            This beat was generated by the pair connected with this color in the
            previous generation
            <div className={s.triangle} style={{ borderTop: "8px solid " + colors[index] }} />
          </div>

          <Scorer {...this.props} />

					<div className={heartClass} onClick={() => this.props.likeBeatFirebaseAction(timelineIndex, index, beat)}/>
          
				</div>
			</div>
    );
  }
}

export default withStyles(s)(Box);
