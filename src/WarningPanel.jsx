import React from 'react';
import { Alert } from 'react-bootstrap';

export default ({ errors }) => {
  const issetErrors = errors.length > 0;
  const error = issetErrors ? errors[errors.length - 1].text : null;

  return (
    <div className="WarningPanel">
      <Alert show={issetErrors} variant="warning">{error}</Alert>
    </div>
  );
};
