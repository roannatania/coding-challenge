import React, { useEffect, useState } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ProductList from './components/ProductList'

import {
  getDataFromCsv,
  setListOfSuppliersIds,
  removeSuppliersNotOnTheList,
  modifySecondCatalog,
  mergeCatalog,
  saveMergeCatalogToFolder,
} from './helpers'

import suppliersA from './input/suppliersA.csv'
import suppliersB from './input/suppliersB.csv'
import barcodesA from './input/barcodesA.csv'
import barcodesB from './input/barcodesB.csv'
import catalogA from './input/catalogA.csv'
import catalogB from './input/catalogB.csv'

import headerLogo from './images/bunnings-logo.jpg'

import * as styles from './AppStyles'

const App = () => {
  const [suppliersIdsA, setSuppliersIdsA] = useState([])
  const [suppliersIdsB, setSuppliersIdsB] = useState([])
  const [barcodesAFileData, setBarcodesAFileData] = useState([])
  const [barcodesBFileData, setBarcodesBFileData] = useState([])
  const [catalogAData, setCatalogAData] = useState([])
  const [catalogBData, setCatalogBData] = useState([])

  const [modifiedBarcodesAFileData, setModifiedBarcodesAFileData] = useState([])
  const [modifiedBarcodesBFileData, setModifiedBarcodesBFileData] = useState([])
  const [modifiedCatalogB, setModifiedCatalogB] = useState([])
  const [mergedCatalog, setMergedCatalog] = useState(null)

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getDataFromCsv(suppliersA, setListOfSuppliersIds(setSuppliersIdsA))
    getDataFromCsv(suppliersB, setListOfSuppliersIds(setSuppliersIdsB))
    getDataFromCsv(barcodesA, setBarcodesAFileData)
    getDataFromCsv(barcodesB, setBarcodesBFileData)
    getDataFromCsv(catalogA, setCatalogAData)
    getDataFromCsv(catalogB, setCatalogBData)
  }, [])

  useEffect(() => {
    const newBarcodesAFileData = removeSuppliersNotOnTheList({
      barcodesFileData: barcodesAFileData,
      suppliersIdsList: suppliersIdsA
    })
    setModifiedBarcodesAFileData(newBarcodesAFileData)
  }, [suppliersIdsA, barcodesAFileData])

  useEffect(() => {
    const newBarcodesBFileData = removeSuppliersNotOnTheList({
      barcodesFileData: barcodesBFileData,
      suppliersIdsList: suppliersIdsB
    })
    setModifiedBarcodesBFileData(newBarcodesBFileData)
  }, [suppliersIdsB, barcodesBFileData])

  useEffect(() => {
    const newCatalogB = modifySecondCatalog({
      firstBarcodesFileData: modifiedBarcodesAFileData,
      secondBarcodesFileData: modifiedBarcodesBFileData,
      secondCatalog: catalogBData
    })
    setModifiedCatalogB(newCatalogB)
  }, [modifiedBarcodesAFileData, modifiedBarcodesBFileData, catalogBData])

  useEffect(() => {
    const newCatalog = mergeCatalog({
      firstCatalog: catalogAData,
      secondCatalog: modifiedCatalogB,
    })
    setMergedCatalog(newCatalog)
  }, [catalogAData, modifiedCatalogB])

  useEffect(() => {
    if(mergedCatalog && mergedCatalog?.length > 0) {
      saveMergeCatalogToFolder(mergedCatalog, setErrorMessage)
    }
  }, [mergedCatalog])

  return (
    <div className={styles.mainWrapper}>
      <Header
        logoImg={headerLogo}
        logoAlt="Bunnings Warehouse"
        text="Welcome!"
      />
      <div className={styles.body}>
        <div className={styles.bodyInner}>
          {mergedCatalog ? (
           <>
              <ProductList productCatalog={mergedCatalog} />
              {!errorMessage && <p className={styles.doneMessage}>Catalog has been merged.<br />You should see the result in results_output.csv file in root/output folder.</p>}
            </>
          ) : <Loader />}
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
      </div>
      <Footer text="Created by Roanna Tania" />
    </div>
  )
}

export default App
