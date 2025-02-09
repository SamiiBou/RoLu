//
//  CustomView17.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView17: View {
    @State public var image16Path: String = "image16_1213735"
    @State public var text20Text: String = "Tutor"
    var body: some View {
        ZStack(alignment: .topLeading) {
            Image(image16Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .padding(EdgeInsets(top: 0, leading: 0, bottom: 7.376, trailing: -0.859))
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
            Text(text20Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Medium", size: 12))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 11, y: 3)
        }
        .frame(width: 56.59, height: 29.376, alignment: .topLeading)
        .clipped()
    }
}

struct CustomView17_Previews: PreviewProvider {
    static var previews: some View {
        CustomView17()
    }
}
