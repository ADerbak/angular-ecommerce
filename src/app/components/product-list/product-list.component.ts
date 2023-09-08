import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryID: number = 1;



  constructor(private productService: ProductService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
    this.listProducts();
    });
        
  }

  
  listProducts() {

    // check if "id" parameter is available
  const hasCategoryID: boolean = this.route.snapshot.paramMap.has('id')

  if (hasCategoryID){
    // get the "id" param string. conver string to a number using the "+" symbol
    this.currentCategoryID = +this.route.snapshot.paramMap.get('id')!;
    // the "!" is a non-null assertion.
  }
  else{
    // no category id available, used default of 1
    this.currentCategoryID = 1;
  }

    this.productService.getProductList(this.currentCategoryID).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
