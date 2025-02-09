//
//  CustomView8.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView8: View {
    @State public var image5Path: String = "image5_1213691"
    @State public var text7Text: String = "Mexico City"
    @State public var image6Path: String = "image6_1213694"
    var body: some View {
        ZStack(alignment: .topLeading) {
            Image(image5Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 25, height: 25, alignment: .topLeading)
            Text(text7Text)
                .foregroundColor(Color(red: 0.00, green: 0.00, blue: 0.00, opacity: 1.00))
                .font(.custom("Spartan-SemiBold", size: 16))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 32, y: 5)
            Image(image6Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 20, height: 20, alignment: .topLeading)
                .offset(x: 133, y: 5)
        }
        .frame(width: 153, height: 25, alignment: .topLeading)
    }
}

struct CustomView8_Previews: PreviewProvider {
    static var previews: some View {
        CustomView8()
    }
}
