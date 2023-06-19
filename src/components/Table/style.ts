import styled from 'styled-components'

export const TableStyled = styled.table`
  width: 100%;
  background-color: #fff;

  border-spacing: 0 0;

  th {
    background-color: #fff;
    border-bottom: 3px solid #d6d2d2;
    font-weight: bold;
    cursor: pointer;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 10px;
    }

    .arrows {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .sort-arrow {
    background-repeat: no-repeat;
    background-position: center right;

    &.visible {
      visibility: visible;
    }

    &.hidden {
      visibility: hidden;
    }
  }

  td {
    text-align: center;
    border-top: 1px solid #d6d2d2;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  tr:first-child td {
    border-top: none;
  }

  tbody tr:nth-child(n) td {
    background: #fff;
  }

  tbody tr:nth-child(2n) td {
    background: #e2ffa6;
  }

  @media (max-width: 767px) {
    font-size: 9px;

    .title {
      flex-direction: column;

      .arrows {
        flex-direction: row;
      }
    }
  }
`
