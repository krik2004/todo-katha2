import React from 'react';
import PropTypes from 'prop-types';
import './footer.css';

function Footer({
  leftCount, setFilter, filter, clearCompleted,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {leftCount}
        {' '}
        items left
      </span>
      <ul className="filters">
        <li>
          <button type="button" className={filter === 'all' ? 'selected' : ''} onClick={() => setFilter('all')}>
            All
          </button>
        </li>
        <li>
          <button type="button" className={filter === 'active' ? 'selected' : ''} onClick={() => setFilter('active')}>
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
      <button type="button" onClick={() => clearCompleted()} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}
Footer.propTypes = {
  setFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  leftCount: PropTypes.number.isRequired,
};
export default Footer;
