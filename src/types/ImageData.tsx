import { IGatsbyImageData } from '../../node_modules/gatsby-plugin-image/dist/src/components/gatsby-image.browser';

export type ImageData = {
    node: {
        childImageSharp: {
            gatsbyImageData: IGatsbyImageData
        }
    }
}

