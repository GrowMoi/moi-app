import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../utils';
import levelsConfig from './neuronConfigs/levels.config';
import { FLORECIDA } from '../../../constants';

const Container = styled(View)`
  position: absolute;
  width: ${({ width }) => width};
  height: ${({ treeDimensions: { width: _width, height }, width }) => getHeightAspectRatio(_width, height, width)};
  bottom: 50;
  left: 0;
  overflow: visible;
`;

const FloweredBranch = styled(Image)`
  width: ${({ width }) => width};
  height: ${({ treeDimensions: { width: _width, height }, width }) => getHeightAspectRatio(_width, height, width)};
  position: absolute;
  bottom: 0;
  left: 0;
`;

const FloweredBranchContainer = styled(View)`
  width: ${({ width }) => width};
  height: ${({ treeDimensions: { width: _width, height }, width }) => getHeightAspectRatio(_width, height, width)};
  position: absolute;
  bottom: 0;
  left: 0;
`;

const RecursiveBranches = ({
  data,
  level = 2,
  maxLevel,
  configs,
  index = 0,
  width,
  treeDimensions,
  parentIndex = 0,
  path = '',
}) => {
  let children;

  const isFlowered = data.state === FLORECIDA;
  // const parentIndexExistInConfigs = `${parentIndex}` in configs[`level${level}`];
  // const indexExistInConfigs = parentIndexExistInConfigs && `${index}` in configs[`level${level}`][parentIndex];

  let newPath;
  if (path) {
    newPath = `${path}.${level}.${index}`;
  } else {
    newPath = `${level}.${index}`;
  }

  if (data.children && data.children.length) {
    children = data.children.map((child, childIndex) => {
      if (level === maxLevel) return null;
      return (
        <RecursiveBranches
          key={`branch-level${level}-${index}-${childIndex}`}
          data={child}
          level={level + 1}
          maxLevel={maxLevel}
          configs={configs}
          parentIndex={index}
          index={childIndex}
          width={width}
          treeDimensions={treeDimensions}
          path={newPath}
        />
      );
    });
  }


  return (
    <FloweredBranchContainer width={width} treeDimensions={treeDimensions}>
      {isFlowered && ((configs[newPath] || {}).floweredBranches || []).map((sourceBranch, branchIndex) => {
        return (
          <FloweredBranch
            key={`branch-level${level}-${parentIndex}-${index}-branch${branchIndex}`}
            source={sourceBranch}
            width={width}
            treeDimensions={treeDimensions}
            resizeMode='contain'
          />
        );
      })}
      {children}
    </FloweredBranchContainer>
  );
};

export default class Branches extends Component {
  renderBranchByDirection = (direction, data) => {
    const levelConfig = levelsConfig[direction];
    const { treeDimensions, width, level } = this.props;

    return (
      <RecursiveBranches
        key={`branch-${direction}`}
        data={data}
        maxLevel={level}
        width={width}
        treeDimensions={treeDimensions}
        configs={levelConfig}
      />
    );
  }

  renderBranches = () => {
    const { data: { root } } = this.props;

    const branches = root.children.map((child, i) => {
      if (i === 0) return this.renderBranchByDirection('left', child, i);
      else if (i === 1) return this.renderBranchByDirection('leftCenter', child, i);
      else if (i === 2) return this.renderBranchByDirection('rightCenter', child, i);
      else if (i === 3) return this.renderBranchByDirection('right', child, i);
    });

    return branches;
  }

  render() {
    const { treeDimensions, width } = this.props;

    return (
      <Container width={width} treeDimensions={treeDimensions}>
        {this.renderBranches()}
      </Container>
    );
  }
}

Branches.propTypes = {
  data: PropTypes.object,
  width: PropTypes.number,
  level: PropTypes.number,
  treeDimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};
