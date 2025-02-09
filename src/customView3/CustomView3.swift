//
//  CustomView3.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView3: View {
    @State public var image1Path: String = "image1_I121367727558"
    @State public var text1Text: String = "Search Jobs"
    var body: some View {
        ZStack(alignment: .topLeading) {
            CustomView4(
                image1Path: image1Path,
                text1Text: text1Text)
                .frame(width: 310, height: 40)
        }
        .frame(width: 310, height: 40, alignment: .topLeading)
        .clipShape(RoundedRectangle(cornerRadius: 5))
    }
}

struct CustomView3_Previews: PreviewProvider {
    static var previews: some View {
        CustomView3()
    }
}
