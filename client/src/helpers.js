import Papa from 'papaparse'
import fetch from 'isomorphic-fetch'

export const getDataFromCsv = async (file = null, func = null) => {
  if (!file || !func) return []

  const response = await fetch(file)
  const reader = response.body.getReader()
  const result = await reader.read()
  const decoder = new TextDecoder('utf-8')
  const csv = decoder.decode(result.value)

  Papa.parse(csv, { header: true, skipEmptyLines: true, complete: (results, file) => {func(results.data)} })
}

export const setListOfSuppliersIds = setSuppliersIds => (suppliersFileData = []) => {
  if (!setSuppliersIds) return

  if (!suppliersFileData.length || !Array.isArray(suppliersFileData)) {
    setSuppliersIds([])
    return
  }

  setSuppliersIds(suppliersFileData.map(supplierObj => supplierObj?.ID))
}

export const removeSuppliersNotOnTheList = ({
  barcodesFileData = [],
  suppliersIdsList = [],
}) => {
  if (!Array.isArray(barcodesFileData) || !barcodesFileData.length) return []

  if (!Array.isArray(suppliersIdsList) || !suppliersIdsList.length) return barcodesFileData

  const filteredBarcodesFileData = barcodesFileData.filter(obj => suppliersIdsList.includes(obj?.SupplierID))
  return filteredBarcodesFileData
}

export const modifySecondCatalog = ({
  firstBarcodesFileData = [],
  secondBarcodesFileData = [],
  secondCatalog = [],
}) => {
  if (!Array.isArray(secondCatalog) || !secondCatalog.length) return []

  if (
    !Array.isArray(firstBarcodesFileData) ||
    !Array.isArray(secondBarcodesFileData) ||
    !firstBarcodesFileData.length ||
    !secondBarcodesFileData.length
  ) return secondCatalog

  const firstBarcodesList = firstBarcodesFileData.map(obj => obj?.Barcode)
  const productsToBeRemoved = [...new Set(secondBarcodesFileData.map(obj => {
    if (firstBarcodesList.includes(obj?.Barcode)) {
      return obj?.SKU
    }

    return null
  }))].filter(Boolean)

  return secondCatalog.filter(obj => !productsToBeRemoved.includes(obj?.SKU))
}

const addSourceToCatalog = (catalog = [], source) => {
  if (!source) return catalog

  if (!catalog.length || !Array.isArray(catalog)) return []

  return catalog.map(obj => {
    return {
      ...obj,
      Source: source
    }
  })
}

const sortCatalogPerDescriptionAscending = (catalog = []) => {
  if (!Array.isArray(catalog) || !catalog.length) return []

  return catalog.sort((a, b) => a.Description > b.Description ? 1 : -1)
}

export const mergeCatalog = ({
  firstCatalog = [],
  secondCatalog = [],
}) => {
  const firstCatalogIsNotValid = !Array.isArray(firstCatalog) || !firstCatalog.length
  const secondCatalogIsNotValid = !Array.isArray(secondCatalog) || !secondCatalog.length

  if (firstCatalogIsNotValid && secondCatalogIsNotValid) return []

  if (firstCatalogIsNotValid) {
    return secondCatalogIsNotValid ? [] : sortCatalogPerDescriptionAscending(addSourceToCatalog(secondCatalog, 'B'))
  }

  if (secondCatalogIsNotValid) {
    return firstCatalogIsNotValid ? [] : sortCatalogPerDescriptionAscending(addSourceToCatalog(firstCatalog, 'A'))
  }

  return sortCatalogPerDescriptionAscending([
    ...addSourceToCatalog(firstCatalog, 'A'),
    ...addSourceToCatalog(secondCatalog, 'B')
  ])
}

export const saveMergeCatalogToFolder = (mergedCatalog, setErrorMessage) => {
  try {
    fetch('http://localhost:9000/save-to-folder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mergedCatalog)
    })
  } catch(err) {
    if (setErrorMessage) {
      setErrorMessage('Something went wrong, you might not see the output file in the root/output folder.')
    }
    console.error(err)
  }
}