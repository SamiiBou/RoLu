//
//  CustomView4.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView4: View {
    @State public var image1Path: String = "image1_I121367727558"
    @State public var text1Text: String = "Search Jobs"
    var body: some View {
        HStack(alignment: .center, spacing: 11) {
            Image(image1Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 24.914, height: 24.914, alignment: .topLeading)
            CustomView5(text1Text: text1Text)
                .frame(height: 18)
        }
        .padding(EdgeInsets(top: 5, leading: 11, bottom: 5, trailing: 11))
        .frame(width: 310, height: 40, alignment: .topLeading)
        .background(Color(red: 1.00, green: 1.00, blue: 1.00, opacity: 1.00))
        .clipShape(RoundedRectangle(cornerRadius: 5))
    }
}

struct CustomView4_Previews: PreviewProvider {
    static var previews: some View {
        CustomView4()
    }
}
