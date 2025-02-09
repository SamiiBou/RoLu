//
//  CustomView26.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView26: View {
    @State public var image24Path: String = "image24_I121375827558"
    @State public var text36Text: String = "Search Jobs"
    var body: some View {
        ZStack(alignment: .topLeading) {
            CustomView27(
                image24Path: image24Path,
                text36Text: text36Text)
                .frame(width: 310, height: 40)
        }
        .frame(width: 310, height: 40, alignment: .topLeading)
        .clipShape(RoundedRectangle(cornerRadius: 5))
    }
}

struct CustomView26_Previews: PreviewProvider {
    static var previews: some View {
        CustomView26()
    }
}
