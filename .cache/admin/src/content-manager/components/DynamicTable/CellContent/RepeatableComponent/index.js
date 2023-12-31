import React from 'react';

import { Badge, Box, MenuItem, SimpleMenu, Typography } from '@strapi/design-system';
import { stopPropagation } from '@strapi/helper-plugin';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import CellValue from '../CellValue';

const TypographyMaxWidth = styled(Typography)`
  max-width: 500px;
`;

const RepeatableComponentCell = ({ value, metadatas }) => {
  const { formatMessage } = useIntl();
  const {
    mainField: { type: mainFieldType, name: mainFieldName },
  } = metadatas;

  const Label = (
    <>
      <Badge>{value.length}</Badge>{' '}
      {formatMessage(
        {
          id: 'content-manager.containers.ListPage.items',
          defaultMessage: '{number, plural, =0 {items} one {item} other {items}}',
        },
        { number: value.length }
      )}
    </>
  );

  return (
    <Box {...stopPropagation}>
      <SimpleMenu label={Label} size="S">
        {value.map((item) => (
          <MenuItem key={item.id} aria-disabled>
            <TypographyMaxWidth ellipsis>
              <CellValue type={mainFieldType} value={item[mainFieldName] || item.id} />
            </TypographyMaxWidth>
          </MenuItem>
        ))}
      </SimpleMenu>
    </Box>
  );
};

RepeatableComponentCell.propTypes = {
  metadatas: PropTypes.shape({
    mainField: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      value: PropTypes.string,
    }),
  }).isRequired,
  value: PropTypes.array.isRequired,
};

export default RepeatableComponentCell;
