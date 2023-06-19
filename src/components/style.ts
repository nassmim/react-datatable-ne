import styled from 'styled-components'

export const EmployeesSection = styled.section``

export const TableDisplayOptions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
    row-gap: 20px;
    align-items: center;
  }
`

export const EntriesLengthChoice = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  input {
    height: 15px;
    width: 30px;
  }
`

export const SearchField = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  input {
    height: 30px;
    border-radius: 5px;
  }
`

export const TablePagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 5%;
  margin-bottom: 30px;

  .arrows {
    display: flex;
    column-gap: 30px;
    align-items: center;
    flex-wrap: wrap;

    .page-number {
      cursor: pointer;

      &.active {
        font-weight: bold;
        padding: 5px 10px;
        background: linear-gradient(to bottom, #fff 0%, #dcdcdc 100%);
        border: 1px solid #979797;
        cursor: default;
      }
    }
  }

  @media (max-width: 767px) {
    justify-content: center;
    margin-top: 20px;

    .page-number {
      display: none;
    }
  }
`

export const Arrow = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
  className: props.className,
}))`
  ${(props) => {
    if (props.style) {
      return `
        width: ${props.width};
        cursor: ${props.style?.cursor};
        transform: rotate(${props.style?.rotate});
        opacity: ${props.style?.opacity};
      `
    }
  }}
`

export const NoData = styled.p`
  display: flex;
  justify-content: center;
  font-weight: bold;
  margin-top: 20px;
`
