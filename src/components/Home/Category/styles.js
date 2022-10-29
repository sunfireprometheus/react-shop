import styled from 'styled-components'

export const CategoryContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`
export const CategoryTitle = styled.div`
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    padding: 10px;
    margin-bottom: 10px;
    text-transform: uppercase;
    background-color: #f5f7f9;
`
export const CategoriesWrapper = styled.div`
  width: 100%;
  margin-bottom: 65px;
  padding: 10px;
  display: flex;
  ${({ viewType }) => `
    justify-content: ${viewType === 'grid' ? 'space-between' : 'center'};
  `}
  flex-wrap: wrap;
`
export const CategoryItem = styled.div`
  cursor: pointer;
  ${({ viewType }) => `
    width: ${viewType === 'grid' ? '48%' : '60%'};
    margin-bottom: ${viewType === 'grid' ? '10px' : '10px'};
  `}
`
export const CategoryImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const CategoryImg = styled.img`
  width: 100%;
  border-radius: 12px;
  max-width: 200px;
`
export const CategoryName = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryIconCol};
`

