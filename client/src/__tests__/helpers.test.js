import {
  removeSuppliersNotOnTheList,
  modifySecondCatalog,
  mergeCatalog
} from '../helpers'

describe('helpers', () => {
  describe('removeSuppliersNotOnTheList', () => {
    const suppliersList = ['00001', '00002', '00003'];
    const data = [{
      SupplierID: '00001',
      SKU: '647-vyk-317',
      Barcode: 'z2783613083817'
    }, {
      SupplierID: '00001',
      SKU: '647-vyk-317',
      Barcode: 'z2783613083818'
    }, {
      SupplierID: '00002',
      SKU: '280-oad-768',
      Barcode: 'p2359014924610'
    }, {
      SupplierID: '00003',
      SKU: '165-rcy-650',
      Barcode: 'u5160747892301'
    }, {
      SupplierID: '00004',
      SKU: '167-eol-949',
      Barcode: 'a2338856941909'
    }, {
      SupplierID: '00004',
      SKU: '167-eol-949',
      Barcode: 'a9858014383660'
    }]

    it('should return only data of suppliers whose ID exists in the list', () => {
      expect(removeSuppliersNotOnTheList({
        barcodesFileData: data,
        suppliersIdsList: suppliersList
      })).toEqual([{
        SupplierID: '00001',
        SKU: '647-vyk-317',
        Barcode: 'z2783613083817'
      }, {
        SupplierID: '00001',
        SKU: '647-vyk-317',
        Barcode: 'z2783613083818'
      }, {
        SupplierID: '00002',
        SKU: '280-oad-768',
        Barcode: 'p2359014924610'
      }, {
        SupplierID: '00003',
        SKU: '165-rcy-650',
        Barcode: 'u5160747892301'
      }])
    })

    it('should return empty array if barcodesFileData is empty array OR not supplied OR not array', () => {
      expect(removeSuppliersNotOnTheList({
        barcodesFileData: 'test wrong type',
        suppliersIdsList: suppliersList
      })).toEqual([])

      expect(removeSuppliersNotOnTheList({
        suppliersIdsList: suppliersList
      })).toEqual([])

      expect(removeSuppliersNotOnTheList({
        barcodesFileData: [],
        suppliersIdsList: suppliersList
      })).toEqual([])
    })

    it('should return barcodesFileData if suppliersIdsList is empty array OR not supplied OR not array', () => {
      expect(removeSuppliersNotOnTheList({
        barcodesFileData: data,
        suppliersIdsList: 10
      })).toEqual(data)

      expect(removeSuppliersNotOnTheList({
        barcodesFileData: data,
      })).toEqual(data)

      expect(removeSuppliersNotOnTheList({
        barcodesFileData: data,
        suppliersIdsList: []
      })).toEqual(data)
    })
  })

  describe('modifySecondCatalog', () => {
    const barcodeAData = [{
      SupplierID: '00001',
      SKU: '647-vyk-317',
      Barcode: 'z2783613083817'
    }, {
      SupplierID: '00001',
      SKU: '647-vyk-317',
      Barcode: 'z2783613083818'
    }, {
      SupplierID: '00002',
      SKU: '280-oad-768',
      Barcode: 'p2359014924610'
    }, {
      SupplierID: '00003',
      SKU: '165-rcy-650',
      Barcode: 'u5160747892301'
    }, {
      SupplierID: '00004',
      SKU: '167-eol-949',
      Barcode: 'a2338856941909'
    }, {
      SupplierID: '00004',
      SKU: '167-eol-949',
      Barcode: 'a9858014383660'
    }]

    const barcodeBData = [{
      SupplierID: '00001',
      SKU: '999-vyk-317',
      Barcode: 'z2783613083817'
    }, {
      SupplierID: '00001',
      SKU: '999-vyk-317',
      Barcode: 'n7405223693844'
    }, {
      SupplierID: '00002',
      SKU: '999-oad-768',
      Barcode: 'b8710606253394'
    }, {
      SupplierID: '00003',
      SKU: '165-rcy-650',
      Barcode: 'p2359014924610'
    }, {
      SupplierID: '00004',
      SKU: '999-eol-949',
      Barcode: 'x6971219877032'
    }, {
      SupplierID: '00004',
      SKU: '999-eol-949',
      Barcode: 'x0126648261918'
    }]

    const catalogB = [{
      SKU: '999-vyk-317',
      Description: 'Walkers Special Old Whiskey test'
    }, {
      SKU: '999-oad-768',
      Description: 'Bread - Raisin'
    }, {
      SKU: '165-rcy-650',
      Description: 'Tea - Decaf 1 Cup'
    }, {
      SKU: '999-eol-949',
      Description: 'Cheese - Grana Padano'
    }]

    it('should removes product data from second catalog if one of the product barcode in second barcode data exists in first barcode data', () => {
      expect(modifySecondCatalog({
        firstBarcodesFileData: barcodeAData,
        secondBarcodesFileData: barcodeBData,
        secondCatalog: catalogB
      })).toEqual([{
        SKU: '999-oad-768',
        Description: 'Bread - Raisin'
      }, {
        SKU: '999-eol-949',
        Description: 'Cheese - Grana Padano'
      }])
    })

    it('should return empty array if secondCatalog is empty array OR not supplied OR not array', () => {
      expect(modifySecondCatalog({
        firstBarcodesFileData: barcodeAData,
        secondBarcodesFileData: barcodeBData,
        secondCatalog: 'test wrong type'
      })).toEqual([])

      expect(modifySecondCatalog({
        firstBarcodesFileData: barcodeAData,
        secondBarcodesFileData: barcodeBData,
      })).toEqual([])

      expect(modifySecondCatalog({
        firstBarcodesFileData: barcodeAData,
        secondBarcodesFileData: barcodeBData,
        secondCatalog: []
      })).toEqual([])
    })

    it('should return original secondCatalog if one of firstBarcodesFileData OR secondBarcodesFileData, is empty array OR not supplied OR not array', () => {
      expect(modifySecondCatalog({
        firstBarcodesFileData: 'test wrong type',
        secondBarcodesFileData: 10,
        secondCatalog: catalogB
      })).toEqual(catalogB)

      expect(modifySecondCatalog({
        firstBarcodesFileData: barcodeAData,
        secondCatalog: catalogB
      })).toEqual(catalogB)

      expect(modifySecondCatalog({
        firstBarcodesFileData: [],
        secondBarcodesFileData: barcodeBData,
        secondCatalog: catalogB
      })).toEqual(catalogB)
    })
  })

  describe('mergeCatalog', () => {
    const catalogA = [{
      SKU: '647-vyk-317',
      Description: 'Walkers Special Old Whiskey'
    }, {
      SKU: '280-oad-768',
      Description: 'Bread - Raisin'
    }, {
      SKU: '167-eol-949',
      Description: 'Cheese - Grana Padano'
    }]

    const catalogB = [{
      SKU: '165-rcy-650',
      Description: 'Tea - Decaf 1 Cup'
    }, {
      SKU: '999-oad-768',
      Description: 'Bread - Raisin'
    }, {
      SKU: '999-eol-949',
      Description: 'Cheese - Grana Padano'
    }, {
      SKU: '999-epd-782',
      Description: 'Carbonated Water - Lemon Lime'
    }]

    it('should return merged catalog that is sorted by description in ascending order', () => {
      expect(mergeCatalog({
        firstCatalog: catalogA,
        secondCatalog: catalogB
      })).toEqual([{
        SKU: '999-oad-768',
        Description: 'Bread - Raisin',
        Source: 'B'
      }, {
        SKU: '280-oad-768',
        Description: 'Bread - Raisin',
        Source: 'A'
      }, {
        SKU: '999-epd-782',
        Description: 'Carbonated Water - Lemon Lime',
        Source: 'B'
      }, {
        SKU: '999-eol-949',
        Description: 'Cheese - Grana Padano',
        Source: 'B'
      }, {
        SKU: '167-eol-949',
        Description: 'Cheese - Grana Padano',
        Source: 'A'
      }, {
        SKU: '165-rcy-650',
        Description: 'Tea - Decaf 1 Cup',
        Source: 'B'
      }, {
        SKU: '647-vyk-317',
        Description: 'Walkers Special Old Whiskey',
        Source: 'A'
      }])
    })

    it('item in merged catalog should have Source field', () => {
      expect(mergeCatalog({
        firstCatalog: catalogA,
        secondCatalog: catalogB
      })).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ Source: 'A' }),
          expect.objectContaining({ Source: 'B' })
        ])
      )
    })

    it('should return empty array if both of the catalogs are not supplied OR not array OR empty array', () => {
      expect(mergeCatalog({})).toEqual([])

      expect(mergeCatalog({
        firstCatalog: { type: 'is object' },
        secondCatalog: 10
      })).toEqual([])

      expect(mergeCatalog({
        firstCatalog: 'test wrong type',
        secondCatalog: []
      })).toEqual([])
    })

    it('should return empty array if one catalog is not supplied OR not array OR empty array, and the other catalog is empty array', () => {
      expect(mergeCatalog({
        firstCatalog: [],
        secondCatalog: 10
      })).toEqual([])

      expect(mergeCatalog({
        secondCatalog: []
      })).toEqual([])
    })

    it('should return one catalog that is sorted by description in ascending order AND has Source per item, if one of the catalogs is not array OR not supplied OR empty array, but the other catalog is supplied correctly', () => {
      expect(mergeCatalog({
        firstCatalog: catalogA
      })).toEqual([{
        SKU: '280-oad-768',
        Description: 'Bread - Raisin',
        Source: 'A'
      }, {
        SKU: '167-eol-949',
        Description: 'Cheese - Grana Padano',
        Source: 'A'
      }, {
        SKU: '647-vyk-317',
        Description: 'Walkers Special Old Whiskey',
        Source: 'A'
      }])

      expect(mergeCatalog({
        firstCatalog: { name: 'wrong' },
        secondCatalog: catalogB
      })).toEqual([{
        SKU: '999-oad-768',
        Description: 'Bread - Raisin',
        Source: 'B'
      }, {
        SKU: '999-epd-782',
        Description: 'Carbonated Water - Lemon Lime',
        Source: 'B'
      }, {
        SKU: '999-eol-949',
        Description: 'Cheese - Grana Padano',
        Source: 'B'
      }, {
        SKU: '165-rcy-650',
        Description: 'Tea - Decaf 1 Cup',
        Source: 'B'
      }])

      expect(mergeCatalog({
        secondCatalog: [],
        firstCatalog: catalogA
      })).toEqual([{
        SKU: '280-oad-768',
        Description: 'Bread - Raisin',
        Source: 'A'
      }, {
        SKU: '167-eol-949',
        Description: 'Cheese - Grana Padano',
        Source: 'A'
      }, {
        SKU: '647-vyk-317',
        Description: 'Walkers Special Old Whiskey',
        Source: 'A'
      }])
    })
  })
})

