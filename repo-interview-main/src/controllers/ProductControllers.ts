import "reflect-metadata";
import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Params,
  NotFoundError,
  BadRequestError,
} from "routing-controllers";
import { ProductDTO } from "../dto/Product";
import { MESSAGE_ERROR } from "../const/message-error.const";
import { ProductInterface } from "../interfaces/product.interface";

@JsonController("/products")
export class ProductController {
  products: ProductInterface[] = [
    {
      id: "uno",
      name: "Nombre producto",
      description: "Descripción producto",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: new Date(),
      date_revision: new Date()
    },
    {
      id: "dos",
      name: "Nombre producto",
      description: "Descripción producto",
      logo: "assets-1.png",
      date_release: new Date(),
      date_revision: new Date()
    },
    {
      id: "tres",
      name: "Nombre producto",
      description: "Descripción producto",
      logo: "assets-1.png",
      date_release: new Date(),
      date_revision: new Date()
    },
    {
      id: "cuatro",
      name: "Nombre producto",
      description: "Descripción producto",
      logo: "assets-1.png",
      date_release: new Date(),
      date_revision: new Date()
    },
    {
      id: "cinco",
      name: "Nombre producto",
      description: "Descripción producto",
      logo: "assets-1.png",
      date_release: new Date(),
      date_revision: new Date()
    }, {
      id: "dose",
      name: "Nombre producto",
      description: "Descripción producto",
      logo: "assets-1.png",
      date_release: new Date(),
      date_revision: new Date()
    }
  ];

  @Get("")
  getAll() {
    return {
      data: [...this.products],
    };
  }

  @Get("/verification/:id")
  verifyIdentifier(@Param("id") id: number | string) {
    return this.products.some((product) => product.id === id);
  }

  @Get("/:id")
  getOne(@Param("id") id: number | string) {
    const index = this.findIndex(id);

    if (index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }
    return this.products.find((product) => product.id === id);
  }

  @Post("")
  createItem(@Body({ validate: true }) productItem: ProductDTO) {

    const index = this.findIndex(productItem.id);

    if (index !== -1) {
      throw new BadRequestError(MESSAGE_ERROR.DuplicateIdentifier);
    }

    this.products.push(productItem);
    return {
      message: "Product added successfully",
      data: productItem,
    };
  }

  @Put("/:id")
  put(@Param("id") id: number | string, @Body() productItem: ProductInterface) {
    const index = this.findIndex(id);

    if (index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }

    this.products[index] = {
      ...this.products[index],
      ...productItem,
    };
    return {
      message: "Product updated successfully",
      data: productItem,
    };
  }

  @Delete("/:id")
  remove(@Param("id") id: number | string) {
    const index = this.findIndex(id);

    if (index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }

    this.products = [...this.products.filter((product) => product.id !== id)];
    return {
      message: "Product removed successfully",
    };
  }

  private findIndex(id: number | string) {
    return this.products.findIndex((product) => product.id === id);
  }

}
